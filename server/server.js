'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var io = _interopDefault(require('socket.io-client'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));
var bodyParser = require('body-parser');
var session = _interopDefault(require('express-session'));
var sessionFileStore = _interopDefault(require('session-file-store'));
var io$1 = _interopDefault(require('socket.io'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://vercel.com/'>Vercel</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

async function post(req, res) {
  try {
    const { name, player } = req.body;
    req.session[player] = name;
    res.end(JSON.stringify({ name: name }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}

var route_2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	post: post
});

async function post$1(req, res) {
	try {
    console.log("req.body", req.body);
		const { newScore, counter } = req.body;
    console.log("score ap:", newScore);
		req.session[counter] = newScore;
		res.end(JSON.stringify({ scoreCount: newScore }));
	} catch (error) {
		res.end(JSON.stringify({ error: error.message }));
	}
}

var route_3 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	post: post$1
});

async function post$2(req, res) {
  try {
    const { gameRoom, isHost } = req.body;
    req.session.gameRoom = gameRoom;
    req.session.isHost = isHost;
    res.end(JSON.stringify({ gameRoom, isHost }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}

var route_4 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	post: post$2
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src/routes/_layout.svelte generated by Svelte v3.23.2 */

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<main>${$$slots.default ? $$slots.default({}) : ``}</main>`;
});

/* src/routes/_error.svelte generated by Svelte v3.23.2 */

const css = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-8od9u6"}">${escape(status)}</h1>

<p class="${"svelte-8od9u6"}">${escape(error.message)}</p>

${ ``}`;
});

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.23.2 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/** Callback to inform of a value updates. */



















function page_store(value) {
	const store = writable(value);
	let ready = true;

	function notify() {
		ready = true;
		store.update(val => val);
	}

	function set(new_value) {
		ready = false;
		store.set(new_value);
	}

	function subscribe(run) {
		let old_value;
		return store.subscribe((value) => {
			if (old_value === undefined || (ready && value !== old_value)) {
				run(old_value = value);
			}
		});
	}

	return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

const stores = {
	page: page_store({}),
	preloading: writable(null),
	session: writable(initial_data && initial_data.session)
};

stores.session.subscribe(async value => {

	return;
});

const stores$1 = () => getContext(CONTEXT_KEY);

/*function persist(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function writableSession(key, initialValue) {
  const sessionValue = JSON.parse(sessionStorage.getItem(key));

  if (!sessionValue) persist(key, initialValue);

  const store = writable(sessionValue || initialValue);

  const { set: realSet, subscribe, update: realUpdate } = store;

  return {
    set(value) {
      realSet(value);
      persist(key, value);
    },
    subscribe,
    update(fn) {
      realUpdate(fn);
      persist(key, get(store));
    }
  };
}
*/
//export const scoreCount = writable(0);
//export const playerName = writable("");
const showModal = writable(false);

const initPicked = {};
const userPicked = writable(initPicked);

function initUserPicked() {
  userPicked.update(current => {
    return {};
  });
}

/* src/components/Header.svelte generated by Svelte v3.23.2 */

const css$1 = {
	code: ".Header.svelte-7uq812.svelte-7uq812{height:17vh;padding:3vh;padding-bottom:0}.Header-container.svelte-7uq812.svelte-7uq812{border:3px solid hsl(217, 16%, 45%);border-radius:5px;display:flex;justify-content:space-between}.Header-title.svelte-7uq812.svelte-7uq812{padding:24px;text-align:left}.Header-title.svelte-7uq812 h1.svelte-7uq812{display:table-caption;font-weight:700;font-size:21px;line-height:16px;box-shadow:0 3px 3px 0 hsla(0, 0%, 0%, 0.2)}.Header-score-container.svelte-7uq812.svelte-7uq812{background-image:radial-gradient(hsl(0, 0%, 95.3%), hsl(0, 0%, 100%));border-radius:4px;box-shadow:0 3px 3px 0 hsla(0, 0%, 0%, 0.2);margin:12px;padding:10px 23px}.Header-score-container.svelte-7uq812 span.svelte-7uq812{color:hsl(229, 64.4%, 46.3%);font-weight:600;font-size:10px;letter-spacing:1.56px;display:block}.Header-score-container.svelte-7uq812 p.svelte-7uq812{font-weight:700;font-size:40px;line-height:40px;color:hsl(246, 10.6%, 36.9%);margin:0;letter-spacing:0px;text-align:center}@media screen and (min-width: 768px){.Header.svelte-7uq812.svelte-7uq812{display:inline-block;min-width:700px}.Header-container.svelte-7uq812.svelte-7uq812{border-radius:15px}.Header-title.svelte-7uq812 h1.svelte-7uq812{font-size:30px;line-height:25px}.Header-score-container.svelte-7uq812.svelte-7uq812{padding:15px 40px;border-radius:6px;margin:15px 20px}.Header-score-container.svelte-7uq812 p.svelte-7uq812{font-size:55px;line-height:55px}.Header-score-container.svelte-7uq812 span.svelte-7uq812{font-size:13px;letter-spacing:2px}}",
	map: "{\"version\":3,\"file\":\"Header.svelte\",\"sources\":[\"Header.svelte\"],\"sourcesContent\":[\"<script>\\n  import { stores } from '@sapper/app';\\n  const { session } = stores();\\n</script>\\n<style>\\n  .Header {\\n    height: 17vh;\\n    padding: 3vh;\\n    padding-bottom: 0;\\n  }\\n  .Header-container {\\n    border: 3px solid hsl(217, 16%, 45%);\\n    border-radius: 5px;\\n    display: flex;\\n    justify-content: space-between;\\n  }\\n\\n  .Header-title {\\n    padding: 24px;\\n    text-align: left;\\n  }\\n\\n  .Header-title h1 {\\n    display:table-caption;\\n    font-weight: 700;\\n    font-size: 21px;\\n    line-height: 16px;\\n    box-shadow: 0 3px 3px 0 hsla(0, 0%, 0%, 0.2);\\n  }\\n\\n  .Header-score-container {\\n    background-image: radial-gradient(hsl(0, 0%, 95.3%), hsl(0, 0%, 100%));\\n    border-radius: 4px;\\n    box-shadow: 0 3px 3px 0 hsla(0, 0%, 0%, 0.2);\\n    margin: 12px;\\n    padding: 10px 23px;\\n  }\\n\\n  .Header-score-container span {\\n    color: hsl(229, 64.4%, 46.3%);\\n    font-weight: 600;\\n    font-size: 10px;\\n    letter-spacing: 1.56px;\\n    display: block;\\n  }\\n  .Header-score-container p {\\n    font-weight: 700;\\n    font-size: 40px;\\n    line-height: 40px;\\n    color: hsl(246, 10.6%, 36.9%);\\n    margin: 0;\\n    letter-spacing: 0px;\\n    text-align: center;\\n  }\\n\\n  @media screen and (min-width: 768px) {\\n    .Header {\\n      display: inline-block;\\n      min-width: 700px;\\n      /* padding: 48px 0px; */\\n    }\\n\\n    .Header-container {\\n      border-radius: 15px;\\n    }\\n\\n    .Header-title h1 {\\n      font-size: 30px;\\n      line-height: 25px;\\n    }\\n\\n    .Header-score-container {\\n      padding: 15px 40px;\\n      border-radius: 6px;\\n      margin: 15px 20px;\\n    }\\n\\n    .Header-score-container p {\\n      font-size: 55px;\\n      line-height: 55px;\\n    }\\n\\n    .Header-score-container span {\\n      font-size: 13px;\\n      letter-spacing: 2px;\\n    }\\n  }\\n\\n  /* @media screen and (min-width: 1024px) {\\n    .Header {\\n      padding: 48px 0px 0px 0px;\\n    }\\n  } */\\n</style>\\n<div class=\\\"Header\\\">\\n  <div class=\\\"Header-container\\\">\\n    <div class=\\\"Header-score-container\\\">\\n      <span>{$session.playerName || \\\"You\\\"}</span>\\n      <p class=\\\"score\\\">{$session.playerScore}</p>\\n    </div>\\n    <div class=\\\"Header-title\\\">\\n      <h1>ROCK PAPER SCISSORS</h1>\\n    </div>\\n    <div class=\\\"Header-score-container\\\">\\n      <span>{$session.opponentName || \\\"Enemy\\\"}</span>\\n      <p class=\\\"score\\\">{$session.opponentScore}</p>\\n    </div>\\n  </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAKE,OAAO,4BAAC,CAAC,AACP,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CACZ,cAAc,CAAE,CAAC,AACnB,CAAC,AACD,iBAAiB,4BAAC,CAAC,AACjB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,2BAAa,CAAC,EAAE,cAAC,CAAC,AAChB,QAAQ,aAAa,CACrB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,AAC9C,CAAC,AAED,uBAAuB,4BAAC,CAAC,AACvB,gBAAgB,CAAE,gBAAgB,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,CACtE,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAC5C,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CAAC,IAAI,AACpB,CAAC,AAED,qCAAuB,CAAC,IAAI,cAAC,CAAC,AAC5B,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAC7B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,KAAK,AAChB,CAAC,AACD,qCAAuB,CAAC,CAAC,cAAC,CAAC,AACzB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAC7B,MAAM,CAAE,CAAC,CACT,cAAc,CAAE,GAAG,CACnB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,OAAO,4BAAC,CAAC,AACP,OAAO,CAAE,YAAY,CACrB,SAAS,CAAE,KAAK,AAElB,CAAC,AAED,iBAAiB,4BAAC,CAAC,AACjB,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,2BAAa,CAAC,EAAE,cAAC,CAAC,AAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,uBAAuB,4BAAC,CAAC,AACvB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC,AAED,qCAAuB,CAAC,CAAC,cAAC,CAAC,AACzB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,qCAAuB,CAAC,IAAI,cAAC,CAAC,AAC5B,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,GAAG,AACrB,CAAC,AACH,CAAC\"}"
};

const Header = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $session;
	const { session } = stores$1();
	$session = get_store_value(session);
	$$result.css.add(css$1);
	$session = get_store_value(session);

	return `<div class="${"Header svelte-7uq812"}"><div class="${"Header-container svelte-7uq812"}"><div class="${"Header-score-container svelte-7uq812"}"><span class="${"svelte-7uq812"}">${escape($session.playerName || "You")}</span>
      <p class="${"score svelte-7uq812"}">${escape($session.playerScore)}</p></div>
    <div class="${"Header-title svelte-7uq812"}"><h1 class="${"svelte-7uq812"}">ROCK PAPER SCISSORS</h1></div>
    <div class="${"Header-score-container svelte-7uq812"}"><span class="${"svelte-7uq812"}">${escape($session.opponentName || "Enemy")}</span>
      <p class="${"score svelte-7uq812"}">${escape($session.opponentScore)}</p></div></div></div>`;
});

/* src/components/Main.svelte generated by Svelte v3.23.2 */

const css$2 = {
	code: ".Main.svelte-be5q0b{height:68vh;display:flex;justify-content:space-around;flex-direction:column;align-content:center;align-items:center}",
	map: "{\"version\":3,\"file\":\"Main.svelte\",\"sources\":[\"Main.svelte\"],\"sourcesContent\":[\"<style>\\n  .Main {\\n    height: 68vh;\\n    display: flex;\\n    justify-content: space-around;\\n    flex-direction: column;\\n    align-content: center;\\n    align-items: center;\\n  }\\n\\n  /* .Main-container {\\n    padding: 70px 32px  0px 32px;\\n  }\\n  \\n\\n  @media screen and (min-width: 768px) {\\n    .Main-container {\\n      padding: 35px 0 0 0;\\n    }\\n  } */\\n</style>\\n\\n<div class=\\\"Main\\\">\\n  <slot />\\n</div>\"],\"names\":[],\"mappings\":\"AACE,KAAK,cAAC,CAAC,AACL,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,MAAM,CACrB,WAAW,CAAE,MAAM,AACrB,CAAC\"}"
};

const Main = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$2);
	return `<div class="${"Main svelte-be5q0b"}">${$$slots.default ? $$slots.default({}) : ``}</div>`;
});

const img = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='49' height='59'%3e%3cpath fill='%233B4262' d='M47.125 11.832a2.922 2.922 0 00-1.232-.198c-.57.04-1.029.271-1.302.65-1.604 2.248-2.919 6.493-3.979 9.905-.486 1.577-1.14 3.688-1.612 4.69-.493-2.807.064-13.09.28-17.05l.003-.064c.15-2.751.17-3.234.138-3.446-.238-1.509-.843-2.5-1.799-2.943-.966-.45-2.22-.25-3.572.563-.677.41-.865 1.816-1.446 8.19l-.002.028c-.32 3.502-1.058 11.566-1.965 12.91-1.023-1.88-2.431-12.555-3.039-17.176-.425-3.236-.673-5.094-.84-5.655-.35-1.176-1.83-2.176-3.295-2.232-1.22-.06-2.22.56-2.698 1.638-.894.995-.578 4.292.41 12.102.47 3.718 1.44 11.395.83 12.257-1.219-.133-3.31-4.942-6.215-14.299-.816-2.62-1.068-3.408-1.318-3.753-.494-1.202-2.172-2.129-3.676-2.024a3.183 3.183 0 00-.377.049c-.787.156-2.584.881-2.2 4.226 1.06 4.637 2.213 8.041 3.331 11.346l.023.066c.669 1.98 1.302 3.85 1.89 5.925 1.385 4.9.846 7.94.84 7.975-.046.312-.143.503-.288.57a.556.556 0 01-.195.045c-.44.03-1.098-.26-1.437-.45-.776-1.482-4.636-8.544-8.134-9.524l-.126-.037-.127.012c-1.283.121-2.226.606-2.803 1.441-.914 1.32-.535 3.002-.444 3.34l.052.12c.028.051 2.834 5.165 3.268 7.544.374 2.04 2.311 4.25 3.869 6.026l.064.073c.508.58.946 1.083 1.292 1.548 4.519 4.713 11.665 8.677 11.723 8.71.892.657 1.387 1.293 1.44 1.84a.798.798 0 01-.16.58l-.155.162.988.96 18.853-1.324.804-3.684c2.486-10.402 1.967-19.272 1.958-19.33.01-.327.706-3.483 1.266-6.033l.017-.065c1.117-5.08 2.505-11.4 2.772-13.803.116-1.028-.542-1.972-1.675-2.401z'/%3e%3c/svg%3e";

const img$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3e%3cpath fill='%233B4262' d='M45.06 12.22c-.642-8.096-9.734-7.269-9.734-7.269-3.837-6.765-9.832-1.865-9.832-1.865-4.606-6.63-10.38-.486-10.38-.486-9.957-1.074-9.571 7.066-9.571 7.066-.234 2.588 1.403 10.593 1.403 10.593-1.477-4.614-4.68-.784-4.68-.784-3.94 6.078-.975 9.405-.975 9.405 5.33 6.246 16.688 13.743 16.688 13.743 4.113 2.356 2.373 4.457 2.373 4.457l24.876-4.11.571-4.718c3.782-11.436-.739-26.032-.739-26.032z'/%3e%3c/svg%3e";

const img$2 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='51' height='58'%3e%3cpath fill='%233B4262' d='M13.971 25.702l6.012-8.415c-2.499-.415-7.088-.507-10.846 3.235C3.212 26.421.812 39.163.312 42.248L15.37 57.24c2.711-.232 14.713-1.827 26.279-13.34.122-.249 2.94-2.321.636-4.614-1.1-1.095-2.919-1.074-4.042.044-.572.57-1.461.577-2.021.02-.56-.557-.552-1.443.02-2.012l4.087-4.069c2.076-2.067.119-5.555-2.78-4.717l-3.345 2.851c-.611.53-1.52.439-2.022-.14-.519-.597-.408-1.503.183-2.013 11.687-10.208 9.98-8.979 17.5-15.995 2.809-2.329-.725-6.447-3.493-4.09L28.182 25.45c-.529.448-1.34.457-1.86-.02-.601-.517-.615-1.262-.222-1.85L38.787 3.944c1.854-2.5-1.795-5.277-3.749-2.757L16.28 27.307c-.452.65-1.364.8-1.985.345a1.377 1.377 0 01-.323-1.95z'/%3e%3c/svg%3e";

const tokens  = [
  {
    imgSource: img,
    name: "paper",
    winTo: "rock",
  },
  {
    imgSource: img$2,
    name: "scissors",
    winTo: "paper",
  },
  {
    imgSource: img$1,
    name: "rock",
    winTo: "scissors",
  }
];

/* src/components/Token.svelte generated by Svelte v3.23.2 */

const css$3 = {
	code: ".Token.svelte-az014o.svelte-az014o{cursor:pointer}.Token.rock.not-selected.svelte-az014o.svelte-az014o{grid-column-start:1;grid-column-end:3}.Token-circle.svelte-az014o.svelte-az014o{width:130px;height:125px;border-radius:100%;display:flex;justify-content:center;align-items:center}.Token-inner-circle.svelte-az014o.svelte-az014o{width:100px;height:95px;background:hsl(0, 0%, 95.3%);border-radius:100%;display:flex;justify-content:center;align-items:center;box-shadow:0px -5.88px 0px 0px hsl(228, 23.2%, 78%);margin-top:6.88px}.Token.paper.svelte-az014o .Token-circle.svelte-az014o{background:hsl(230, 89%, 65%);box-shadow:0px 5.88px 0px 0px hsl(229, 64.4%, 46.3%)}.Token.not-selected.paper.svelte-az014o .Token-circle.svelte-az014o:hover{box-shadow:0px 5.88px 0px 0px hsl(229, 64.4%, 46.3%),\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px}.Token.scissors.svelte-az014o .Token-circle.svelte-az014o{background:hsl(40, 84%, 53%);box-shadow:0px 5.88px 0px 0px hsl(28, 76.1%, 44.3%)}.Token.not-selected.scissors.svelte-az014o .Token-circle.svelte-az014o:hover{box-shadow:0px 5.88px 0px 0px hsl(28, 76.1%, 44.3%),\n    rgba(255, 255, 255, 0.04) 0px 0px 0px 20px}.Token.rock.svelte-az014o .Token-circle.svelte-az014o{background:hsl(349, 70%, 56%);box-shadow:0px 5.88px 0px 0px hsl(347, 75.4%, 35.1%)}.Token.not-selected.rock.svelte-az014o .Token-circle.svelte-az014o:hover{box-shadow:0px 5.88px 0px 0px hsl(347, 75.4%, 35.1%),\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px}.Token.empty.svelte-az014o .Token-inner-circle.svelte-az014o{background:hsla(0, 0%, 0%, 0.1);box-shadow:none}.Token.winner.svelte-az014o .Token-circle.svelte-az014o{box-shadow:rgba(255, 255, 255, 0.04) 0px 0px 0px 20px, \n      rgba(255, 255, 255, 0.04) 0px 0px 0px 50px,\n      rgba(255, 255, 255, 0.02) 0px 0px 0px 80px;animation-name:svelte-az014o-animate;animation-duration:600ms;animation-timing-function:ease-in-out;animation-iteration-count:1}.Token-circle.animate.svelte-az014o.svelte-az014o{animation-name:svelte-az014o-animate;animation-duration:1000ms;animation-timing-function:linear;animation-iteration-count:infinite\n  }.label.svelte-az014o.svelte-az014o{text-align:center;margin-top:23px;font-weight:700;font-size:13px;letter-spacing:1.88px;line-height:32px}@media screen and (min-width: 768px){.Token-circle.svelte-az014o.svelte-az014o{width:198px;height:194px}.Token-inner-circle.svelte-az014o.svelte-az014o{width:152px;height:144px}.Token-icon.svelte-az014o.svelte-az014o{width:70px}.Token-inner-circle.svelte-az014o.svelte-az014o{box-shadow:0px -9px 0px 0px hsl(228, 23.2%, 78%)}.Token.paper.svelte-az014o .Token-circle.svelte-az014o{box-shadow:0px 9px 0px 0px hsl(229, 64.4%, 46.3%)}.Token.not-selected.paper.svelte-az014o .Token-circle.svelte-az014o:hover{box-shadow:0px 9px 0px 0px hsl(229, 64.4%, 46.3%),\n        rgba(255, 255, 255, 0.04) 0px 0px 0px 20px}.Token.scissors.svelte-az014o .Token-circle.svelte-az014o{box-shadow:0px 9px 0px 0px hsl(28, 76.1%, 44.3%)}.Token.not-selected.scissors.svelte-az014o .Token-circle.svelte-az014o:hover{box-shadow:0px 9px 0px 0px hsl(28, 76.1%, 44.3%),\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px}.Token.rock.svelte-az014o .Token-circle.svelte-az014o{box-shadow:0px 9px 0px 0px hsl(347, 75.4%, 35.1%)}.Token.not-selected.rock.svelte-az014o .Token-circle.svelte-az014o:hover{box-shadow:0px 9px 0px 0px hsl(347, 75.4%, 35.1%),\n        rgba(255, 255, 255, 0.04) 0px 0px 0px 20px}}@media screen and (min-width: 1024px){.Token.selected.svelte-az014o .Token-circle.svelte-az014o{width:292px;height:287px}.Token.selected.svelte-az014o .Token-inner-circle.svelte-az014o{width:225px;height:212px}.Token.selected.svelte-az014o .Token-icon.svelte-az014o{width:100px}.Token.selected.svelte-az014o.svelte-az014o{display:flex;flex-direction:column-reverse}.label.svelte-az014o.svelte-az014o{font-size:24px;margin-bottom:60px}.Token.selected.svelte-az014o .Token-inner-circle.svelte-az014o{box-shadow:0px -13.3px 0px 0px hsl(228, 23.2%, 78%)}.Token.paper.selected.svelte-az014o .Token-circle.svelte-az014o{box-shadow:0px 13.3px 0px 0px hsl(229, 64.4%, 46.3%)}.Token.scissors.selected.svelte-az014o .Token-circle.svelte-az014o{box-shadow:0px 13.3px 0px 0px hsl(28, 76.1%, 44.3%)}.Token.rock.selected.svelte-az014o .Token-circle.svelte-az014o{box-shadow:0px 13.3px 0px 0px hsl(347, 75.4%, 35.1%)}.Token.winner.svelte-az014o .Token-circle.svelte-az014o{box-shadow:rgba(255, 255, 255, 0.04) 0px 0px 0px 50px, \n      rgba(255, 255, 255, 0.04) 0px 0px 0px 100px,\n      rgba(255, 255, 255, 0.02) 0px 0px 0px 160px !important}}@keyframes svelte-az014o-animate{0%{transform:rotateY(0)}25%{transform:rotateY(90deg)}50%{transform:rotateY(180deg)}75%{transform:rotateY(270deg)}100%{transform:rotateY(360deg)}}",
	map: "{\"version\":3,\"file\":\"Token.svelte\",\"sources\":[\"Token.svelte\"],\"sourcesContent\":[\"<script>\\n  import { userPicked } from '../store/store.js';\\n\\n  export let imgSource;\\n  export let name;\\n  export let winTo;\\n  export let whoPicked = undefined;\\n  export let isWinner;\\n  export let isChanging;\\n\\n  export let socket;\\n\\n  import { stores } from '@sapper/app';\\n  const { session } = stores();\\n\\n  function handleClick() {\\n    if($userPicked.name == undefined) {\\n      userPicked.update(current => {\\n        current.name = name\\n        current.imgSource = imgSource\\n        current.winTo = winTo\\n        return current\\n      });\\n      socket.emit(\\\"player choose\\\", {\\n        room: $session.gameRoom,\\n        token: {\\n          name: name,\\n          imgSource: imgSource,\\n          winTo: winTo\\n        }\\n      });\\n    }\\n  } \\n</script>\\n<style>\\n  .Token {\\n    cursor: pointer;\\n  }\\n\\n  .Token.rock.not-selected {\\n    grid-column-start: 1;\\n    grid-column-end: 3;\\n  }\\n\\n  .Token-circle {\\n    width: 130px;\\n    height: 125px;\\n    border-radius: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n\\n  .Token-inner-circle {\\n    width: 100px;\\n    height: 95px;\\n    background: hsl(0, 0%, 95.3%);\\n    border-radius: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    box-shadow: 0px -5.88px 0px 0px hsl(228, 23.2%, 78%);\\n    margin-top: 6.88px;\\n  }\\n\\n  .Token.paper .Token-circle {\\n    background: hsl(230, 89%, 65%);\\n    box-shadow: 0px 5.88px 0px 0px hsl(229, 64.4%, 46.3%);\\n  }\\n  \\n  .Token.not-selected.paper .Token-circle:hover {\\n    box-shadow: 0px 5.88px 0px 0px hsl(229, 64.4%, 46.3%),\\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;\\n  }\\n\\n  .Token.scissors .Token-circle {\\n    background: hsl(40, 84%, 53%);\\n    box-shadow: 0px 5.88px 0px 0px hsl(28, 76.1%, 44.3%);\\n  }\\n  \\n  .Token.not-selected.scissors .Token-circle:hover {\\n    box-shadow: 0px 5.88px 0px 0px hsl(28, 76.1%, 44.3%),\\n    rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;\\n  }\\n\\n  .Token.rock .Token-circle {\\n    background: hsl(349, 70%, 56%);\\n    box-shadow: 0px 5.88px 0px 0px hsl(347, 75.4%, 35.1%);\\n  }\\n  \\n  .Token.not-selected.rock .Token-circle:hover {\\n    box-shadow: 0px 5.88px 0px 0px hsl(347, 75.4%, 35.1%),\\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;\\n  }\\n\\n  .Token.empty .Token-inner-circle  {\\n    background: hsla(0, 0%, 0%, 0.1);\\n    box-shadow: none;\\n  }\\n\\n  .Token.winner .Token-circle {\\n    box-shadow: rgba(255, 255, 255, 0.04) 0px 0px 0px 20px, \\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 50px,\\n      rgba(255, 255, 255, 0.02) 0px 0px 0px 80px;\\n    animation-name: animate;\\n    animation-duration: 600ms;\\n    animation-timing-function: ease-in-out;\\n    animation-iteration-count: 1;\\n  }\\n\\n  .Token-circle.animate  {\\n    animation-name: animate;\\n    animation-duration: 1000ms;\\n    animation-timing-function: linear;\\n    animation-iteration-count: infinite\\n  }\\n  \\n  .label {\\n    text-align: center;\\n    margin-top: 23px;\\n    font-weight: 700;\\n    font-size: 13px;\\n    letter-spacing: 1.88px;\\n    line-height: 32px;\\n  }\\n\\n  @media screen and (min-width: 768px) {\\n    .Token-circle {\\n      width: 198px;\\n      height: 194px;\\n    }\\n\\n    .Token-inner-circle {\\n      width: 152px;\\n      height: 144px;\\n    }\\n\\n    .Token-icon {\\n      width: 70px;\\n    }\\n\\n    .Token-inner-circle {\\n      box-shadow: 0px -9px 0px 0px hsl(228, 23.2%, 78%);\\n    }\\n\\n    .Token.paper .Token-circle {\\n      box-shadow: 0px 9px 0px 0px hsl(229, 64.4%, 46.3%);\\n    }\\n    \\n    .Token.not-selected.paper .Token-circle:hover {\\n      box-shadow: 0px 9px 0px 0px hsl(229, 64.4%, 46.3%),\\n        rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;\\n    }\\n\\n    .Token.scissors .Token-circle {\\n      box-shadow: 0px 9px 0px 0px hsl(28, 76.1%, 44.3%);\\n    }\\n    \\n    .Token.not-selected.scissors .Token-circle:hover {\\n      box-shadow: 0px 9px 0px 0px hsl(28, 76.1%, 44.3%),\\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;\\n    }\\n\\n    .Token.rock .Token-circle {\\n      box-shadow: 0px 9px 0px 0px hsl(347, 75.4%, 35.1%);\\n    }\\n    \\n    .Token.not-selected.rock .Token-circle:hover {\\n      box-shadow: 0px 9px 0px 0px hsl(347, 75.4%, 35.1%),\\n        rgba(255, 255, 255, 0.04) 0px 0px 0px 20px;\\n    }\\n  }\\n\\n  @media screen and (min-width: 1024px) {\\n    .Token.selected .Token-circle {\\n      width: 292px;\\n      height: 287px;\\n    }\\n\\n    .Token.selected .Token-inner-circle {\\n      width: 225px;\\n      height: 212px;\\n    }\\n    \\n    .Token.selected .Token-icon {\\n      width: 100px;\\n    }\\n\\n    .Token.selected {\\n      display: flex;\\n      flex-direction: column-reverse;\\n    }\\n\\n    .label {\\n      font-size: 24px;\\n      margin-bottom: 60px;\\n    }\\n\\n    .Token.selected .Token-inner-circle {\\n      box-shadow: 0px -13.3px 0px 0px hsl(228, 23.2%, 78%);\\n    }\\n\\n    .Token.paper.selected .Token-circle {\\n      box-shadow: 0px 13.3px 0px 0px hsl(229, 64.4%, 46.3%);\\n    }\\n \\n    .Token.scissors.selected .Token-circle {\\n      box-shadow: 0px 13.3px 0px 0px hsl(28, 76.1%, 44.3%);\\n    }\\n    \\n    .Token.rock.selected .Token-circle {\\n      box-shadow: 0px 13.3px 0px 0px hsl(347, 75.4%, 35.1%);\\n    }\\n\\n    .Token.winner .Token-circle {\\n      box-shadow: rgba(255, 255, 255, 0.04) 0px 0px 0px 50px, \\n      rgba(255, 255, 255, 0.04) 0px 0px 0px 100px,\\n      rgba(255, 255, 255, 0.02) 0px 0px 0px 160px !important;\\n    }\\n\\n  }\\n\\n  @keyframes animate {\\n    0% {\\n      transform: rotateY(0);\\n    }\\n\\n    25% {\\n      transform: rotateY(90deg);\\n    }\\n\\n    50% {\\n      transform: rotateY(180deg);\\n    }\\n    \\n    75% {\\n      transform: rotateY(270deg);\\n    }\\n\\n    100% {\\n      transform: rotateY(360deg);\\n    }\\n  }\\n</style>\\n<div class=\\\"Token {name? name : \\\"empty\\\"} {whoPicked? \\\"selected\\\" : \\\"not-selected\\\"}\\\" \\n  class:winner={isWinner} on:click={handleClick}>\\n  <div class=\\\"Token-circle\\\" class:animate={isChanging}>\\n    <div class=\\\"Token-inner-circle\\\">\\n      <img src={imgSource} alt=\\\"\\\" class=\\\"Token-icon\\\">\\n    </div>\\n  </div>\\n  {#if whoPicked != undefined}\\n    <div class=\\\"label\\\">\\n      {whoPicked.toUpperCase()} PICKED\\n    </div>\\n  {/if}\\n</div>\"],\"names\":[],\"mappings\":\"AAmCE,MAAM,4BAAC,CAAC,AACN,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,MAAM,KAAK,aAAa,4BAAC,CAAC,AACxB,iBAAiB,CAAE,CAAC,CACpB,eAAe,CAAE,CAAC,AACpB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,mBAAmB,4BAAC,CAAC,AACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAC7B,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,GAAG,CAAC,OAAO,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CACpD,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,MAAM,oBAAM,CAAC,aAAa,cAAC,CAAC,AAC1B,UAAU,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC9B,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACvD,CAAC,AAED,MAAM,aAAa,oBAAM,CAAC,2BAAa,MAAM,AAAC,CAAC,AAC7C,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;MACpD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,AAC9C,CAAC,AAED,MAAM,uBAAS,CAAC,aAAa,cAAC,CAAC,AAC7B,UAAU,CAAE,IAAI,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC7B,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACtD,CAAC,AAED,MAAM,aAAa,uBAAS,CAAC,2BAAa,MAAM,AAAC,CAAC,AAChD,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;IACrD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,AAC5C,CAAC,AAED,MAAM,mBAAK,CAAC,aAAa,cAAC,CAAC,AACzB,UAAU,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC9B,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACvD,CAAC,AAED,MAAM,aAAa,mBAAK,CAAC,2BAAa,MAAM,AAAC,CAAC,AAC5C,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;MACpD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,AAC9C,CAAC,AAED,MAAM,oBAAM,CAAC,mBAAmB,cAAE,CAAC,AACjC,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAChC,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,MAAM,qBAAO,CAAC,aAAa,cAAC,CAAC,AAC3B,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC;MACrD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC;MAC3C,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAC5C,cAAc,CAAE,qBAAO,CACvB,kBAAkB,CAAE,KAAK,CACzB,yBAAyB,CAAE,WAAW,CACtC,yBAAyB,CAAE,CAAC,AAC9B,CAAC,AAED,aAAa,QAAQ,4BAAE,CAAC,AACtB,cAAc,CAAE,qBAAO,CACvB,kBAAkB,CAAE,MAAM,CAC1B,yBAAyB,CAAE,MAAM,CACjC,yBAAyB,CAAE,QAAQ;EACrC,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,aAAa,4BAAC,CAAC,AACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACf,CAAC,AAED,mBAAmB,4BAAC,CAAC,AACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACf,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,KAAK,CAAE,IAAI,AACb,CAAC,AAED,mBAAmB,4BAAC,CAAC,AACnB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,AACnD,CAAC,AAED,MAAM,oBAAM,CAAC,aAAa,cAAC,CAAC,AAC1B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACpD,CAAC,AAED,MAAM,aAAa,oBAAM,CAAC,2BAAa,MAAM,AAAC,CAAC,AAC7C,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;QACjD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,AAC9C,CAAC,AAED,MAAM,uBAAS,CAAC,aAAa,cAAC,CAAC,AAC7B,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACnD,CAAC,AAED,MAAM,aAAa,uBAAS,CAAC,2BAAa,MAAM,AAAC,CAAC,AAChD,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;MAClD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,AAC5C,CAAC,AAED,MAAM,mBAAK,CAAC,aAAa,cAAC,CAAC,AACzB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACpD,CAAC,AAED,MAAM,aAAa,mBAAK,CAAC,2BAAa,MAAM,AAAC,CAAC,AAC5C,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;QACjD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,AAC9C,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACrC,MAAM,uBAAS,CAAC,aAAa,cAAC,CAAC,AAC7B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACf,CAAC,AAED,MAAM,uBAAS,CAAC,mBAAmB,cAAC,CAAC,AACnC,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACf,CAAC,AAED,MAAM,uBAAS,CAAC,WAAW,cAAC,CAAC,AAC3B,KAAK,CAAE,KAAK,AACd,CAAC,AAED,MAAM,SAAS,4BAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,cAAc,AAChC,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,MAAM,uBAAS,CAAC,mBAAmB,cAAC,CAAC,AACnC,UAAU,CAAE,GAAG,CAAC,OAAO,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,AACtD,CAAC,AAED,MAAM,MAAM,uBAAS,CAAC,aAAa,cAAC,CAAC,AACnC,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACvD,CAAC,AAED,MAAM,SAAS,uBAAS,CAAC,aAAa,cAAC,CAAC,AACtC,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACtD,CAAC,AAED,MAAM,KAAK,uBAAS,CAAC,aAAa,cAAC,CAAC,AAClC,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AACvD,CAAC,AAED,MAAM,qBAAO,CAAC,aAAa,cAAC,CAAC,AAC3B,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC;MACvD,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC;MAC5C,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,UAAU,AACxD,CAAC,AAEH,CAAC,AAED,WAAW,qBAAQ,CAAC,AAClB,EAAE,AAAC,CAAC,AACF,SAAS,CAAE,QAAQ,CAAC,CAAC,AACvB,CAAC,AAED,GAAG,AAAC,CAAC,AACH,SAAS,CAAE,QAAQ,KAAK,CAAC,AAC3B,CAAC,AAED,GAAG,AAAC,CAAC,AACH,SAAS,CAAE,QAAQ,MAAM,CAAC,AAC5B,CAAC,AAED,GAAG,AAAC,CAAC,AACH,SAAS,CAAE,QAAQ,MAAM,CAAC,AAC5B,CAAC,AAED,IAAI,AAAC,CAAC,AACJ,SAAS,CAAE,QAAQ,MAAM,CAAC,AAC5B,CAAC,AACH,CAAC\"}"
};

const Token = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $userPicked = get_store_value(userPicked);
	let $session;
	let { imgSource } = $$props;
	let { name } = $$props;
	let { winTo } = $$props;
	let { whoPicked = undefined } = $$props;
	let { isWinner } = $$props;
	let { isChanging } = $$props;
	let { socket } = $$props;
	const { session } = stores$1();
	$session = get_store_value(session);

	if ($$props.imgSource === void 0 && $$bindings.imgSource && imgSource !== void 0) $$bindings.imgSource(imgSource);
	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
	if ($$props.winTo === void 0 && $$bindings.winTo && winTo !== void 0) $$bindings.winTo(winTo);
	if ($$props.whoPicked === void 0 && $$bindings.whoPicked && whoPicked !== void 0) $$bindings.whoPicked(whoPicked);
	if ($$props.isWinner === void 0 && $$bindings.isWinner && isWinner !== void 0) $$bindings.isWinner(isWinner);
	if ($$props.isChanging === void 0 && $$bindings.isChanging && isChanging !== void 0) $$bindings.isChanging(isChanging);
	if ($$props.socket === void 0 && $$bindings.socket && socket !== void 0) $$bindings.socket(socket);
	$$result.css.add(css$3);
	$session = get_store_value(session);

	return `<div class="${[
		"Token " + escape(name ? name : "empty") + " " + escape(whoPicked ? "selected" : "not-selected") + " svelte-az014o",
		isWinner ? "winner" : ""
	].join(" ").trim()}"><div class="${["Token-circle svelte-az014o", isChanging ? "animate" : ""].join(" ").trim()}"><div class="${"Token-inner-circle svelte-az014o"}"><img${add_attribute("src", imgSource, 0)} alt="${""}" class="${"Token-icon svelte-az014o"}"></div></div>
  ${whoPicked != undefined
	? `<div class="${"label svelte-az014o"}">${escape(whoPicked.toUpperCase())} PICKED
    </div>`
	: ``}</div>`;
});

/* src/components/Result.svelte generated by Svelte v3.23.2 */

const css$4 = {
	code: ".result-container.svelte-o31bx5.svelte-o31bx5{text-align:center;margin-top:50px;grid-column-start:1;grid-column-end:3}.result.svelte-o31bx5.svelte-o31bx5{font-size:56px;text-align:center}.play-again.svelte-o31bx5.svelte-o31bx5{border-radius:8px;padding:15px 60px;margin-top:16px;border:none;background:linear-gradient(hsl(0, 0%, 95.3%), hsl(0, 0%, 100%));cursor:pointer}.play-again.svelte-o31bx5.svelte-o31bx5:focus{outline:0}.play-again.svelte-o31bx5 span.svelte-o31bx5{font-weight:600;font-size:16px;letter-spacing:1px;color:hsl(229, 24.8%, 30.8%)}@media screen and (min-width: 1024px){.result-container.svelte-o31bx5.svelte-o31bx5{grid-column:2 / 4;grid-row:1 / auto;display:flex;align-items:center;justify-content:center;flex-direction:column}}",
	map: "{\"version\":3,\"file\":\"Result.svelte\",\"sources\":[\"Result.svelte\"],\"sourcesContent\":[\"<script>\\n  export let result;\\n  export let handleReset;\\n</script>\\n<style>\\n  .result-container {\\n    text-align: center;\\n    margin-top: 50px;\\n    grid-column-start: 1;\\n    grid-column-end: 3;\\n  }\\n  .result {\\n    font-size: 56px;\\n    text-align: center;\\n  }\\n\\n  .play-again {\\n    border-radius: 8px;\\n    padding: 15px 60px;\\n    margin-top: 16px;\\n    border: none;\\n    background: linear-gradient(hsl(0, 0%, 95.3%), hsl(0, 0%, 100%));\\n    cursor: pointer;\\n  }\\n\\n  .play-again:focus {\\n    outline: 0;\\n  }\\n\\n  .play-again span {\\n    font-weight: 600;\\n    font-size: 16px;\\n    letter-spacing: 1px;\\n    color: hsl(229, 24.8%, 30.8%);\\n  }\\n\\n  @media screen and (min-width: 1024px) {\\n    .result-container {\\n      grid-column: 2 / 4;\\n      grid-row: 1 / auto;\\n      display: flex;\\n      align-items: center;\\n      justify-content: center;\\n      flex-direction: column;\\n    }\\n  }\\n</style>\\n<div class=\\\"result-container\\\">\\n  <div class=\\\"result\\\"><span>{result}</span></div>\\n  <button class=\\\"play-again\\\" on:click={handleReset}><span>PLAY AGAIN</span></button>\\n</div>\"],\"names\":[],\"mappings\":\"AAKE,iBAAiB,4BAAC,CAAC,AACjB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,IAAI,CAChB,iBAAiB,CAAE,CAAC,CACpB,eAAe,CAAE,CAAC,AACpB,CAAC,AACD,OAAO,4BAAC,CAAC,AACP,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,gBAAgB,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,CAChE,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,uCAAW,MAAM,AAAC,CAAC,AACjB,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,yBAAW,CAAC,IAAI,cAAC,CAAC,AAChB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AAC/B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACrC,iBAAiB,4BAAC,CAAC,AACjB,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,QAAQ,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,cAAc,CAAE,MAAM,AACxB,CAAC,AACH,CAAC\"}"
};

const Result = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { result } = $$props;
	let { handleReset } = $$props;
	if ($$props.result === void 0 && $$bindings.result && result !== void 0) $$bindings.result(result);
	if ($$props.handleReset === void 0 && $$bindings.handleReset && handleReset !== void 0) $$bindings.handleReset(handleReset);
	$$result.css.add(css$4);

	return `<div class="${"result-container svelte-o31bx5"}"><div class="${"result svelte-o31bx5"}"><span>${escape(result)}</span></div>
  <button class="${"play-again svelte-o31bx5"}"><span class="${"svelte-o31bx5"}">PLAY AGAIN</span></button></div>`;
});

/* src/components/Game.svelte generated by Svelte v3.23.2 */

const css$5 = {
	code: ".Tokens.svelte-pwwj1f.svelte-pwwj1f{display:grid;grid-template-columns:130px 130px;justify-content:center;justify-items:center;position:relative;gap:30px 50px}.Tokens.svelte-pwwj1f .line.svelte-pwwj1f{position:absolute;background:rgb(15,31,59);width:200px;height:14px;top:58px;z-index:-1;display:block}.Tokens.svelte-pwwj1f .line.svelte-pwwj1f:before,.Tokens.svelte-pwwj1f .line.svelte-pwwj1f:after{content:\"\";position:absolute;background:rgb(15,31,59);height:14px;left:0;top:0;width:200px}.Tokens.svelte-pwwj1f .line.svelte-pwwj1f:before{transform:rotate(60deg);transform-origin:left top}.Tokens.svelte-pwwj1f .line.svelte-pwwj1f:after{transform:rotate(-60deg);transform-origin:right top}@media screen and (min-width: 768px){.Tokens.svelte-pwwj1f.svelte-pwwj1f{grid-template-columns:230px 230px;gap:50px 50px;margin:0}.Tokens.svelte-pwwj1f .line.svelte-pwwj1f{width:300px;top:90px}.Tokens.svelte-pwwj1f .line.svelte-pwwj1f:before,.Tokens.svelte-pwwj1f .line.svelte-pwwj1f:after{width:300px}}@media screen and (min-width: 1024px){.Tokens.picked.svelte-pwwj1f.svelte-pwwj1f{grid-template-columns:320px 320px}.Tokens.finished.svelte-pwwj1f.svelte-pwwj1f{grid-template-columns:300px 110px 110px 300px}}",
	map: "{\"version\":3,\"file\":\"Game.svelte\",\"sources\":[\"Game.svelte\"],\"sourcesContent\":[\"<script>\\n  import tokens from '../model/tokens';\\n  import Token from './Token.svelte';\\n  import Result from './Result.svelte';\\n  import { userPicked, initUserPicked } from '../store/store.js';\\n\\n  import { stores } from '@sapper/app';\\n  const { session } = stores();\\n  console.log(\\\"sessions\\\");\\n  console.log(session);\\n  console.log($session);\\n\\n  export let socket;\\n\\n  socket.emit(\\\"message\\\", \\\"game rendered!\\\");\\n\\n  let housePicked = {};\\n\\n  $: isUserTokenPicked = $userPicked.name !== undefined;\\n\\n  let isHouseTokenPicked = false;\\n  let gameFinished = false;\\n  let win = false;\\n  let isDraw = false;\\n  let isChanging = false;\\n  function pickHouseToken() {\\n    isChanging = true;\\n    let a = 0;\\n    let interval = setInterval(function() {\\n      getRandomToken();\\n      a = a + 1;\\n      if(a == 3) {\\n        clearInterval(interval);\\n        isHouseTokenPicked = true;\\n        isChanging = false;\\n      }\\n    }, 200);\\n  }\\n\\n  function getRandomToken() {\\n    let selected = tokens[Math.floor(Math.random() * 3)];\\n    housePicked = selected;\\n  }\\n\\n  $: if(isHouseTokenPicked & isUserTokenPicked) {\\n    if($userPicked.name == housePicked.name) {\\n      isDraw = true;\\n    } else {\\n      win = $userPicked.winTo == housePicked.name\\n      //scoreCount.update(current => win? current + 1 : (current == 0)? current : current -1);\\n      let newCount = win? 1 : 0\\n      sendScore(newCount, \\\"playerScore\\\", true);\\n    }\\n    gameFinished = true;\\n  }\\n\\n  //$: if(($userPicked.name !== undefined) && (housePicked.name == undefined)) pickHouseToken()\\n  if($session.gameRoom) {\\n    if($session.isHost) {\\n      socket.emit(\\\"createRoom\\\", {\\n        room: $session.gameRoom,\\n        playerName: $session.playerName,\\n        message: \\\"\\\"\\n      });\\n    } else {\\n      socket.emit(\\\"joinRoom\\\", {\\n        room: $session.gameRoom,\\n        playerName : $session.playerName,\\n        message: \\\"\\\"\\n      });\\n    }\\n  }\\n  const sendScore = async (score, player, sendScore) => {\\n    console.log(\\\"2\\\",score);\\n    let newScore = $session[player] + score;\\n    const response = await fetch(\\\"/api/score\\\", {\\n      method: \\\"POST\\\",\\n      headers: {\\n        \\\"Content-Type\\\": \\\"application/json\\\",\\n        Accept: \\\"application/json\\\"\\n      },\\n      body: JSON.stringify({ newScore, counter: player })\\n    });\\n    console.log(\\\"1:\\\",response);\\n    const scoreCountResponse = await response.json();\\n    console.log(\\\"scoreCountResponse:\\\",scoreCountResponse);\\n    if (!scoreCountResponse.error) {\\n      $session[player] = scoreCountResponse.scoreCount;\\n      if(sendScore){\\n        socket.emit(\\\"player score\\\", {\\n          room: $session.gameRoom,\\n          score: score\\n        });\\n      }\\n    }\\n  };\\n\\n  socket.on(\\\"player response\\\", function(token) {\\n    console.log(\\\"player token response:\\\", token);\\n    housePicked = token;\\n    isHouseTokenPicked = true;\\n  });\\n  \\n  socket.on(\\\"opponent join\\\", function(opponentName) {\\n    console.log(\\\"opponent join:\\\", opponentName);\\n    sendOpponentName(opponentName);\\n    socket.emit(\\\"host name\\\", {\\n      room: $session.gameRoom,\\n      playerName: $session.playerName\\n    });\\n\\t});\\n  \\n  socket.on(\\\"host name\\\", function(opponentName) {\\n    console.log(\\\"hostname join:\\\", opponentName);\\n    sendOpponentName(opponentName);\\n  });\\n  \\n  const sendOpponentName = async (name) => {\\n    const response = await fetch(\\\"/api/player\\\", {\\n      method: \\\"POST\\\",\\n      headers: {\\n        \\\"Content-Type\\\": \\\"application/json\\\",\\n        Accept: \\\"application/json\\\"\\n      },\\n      body: JSON.stringify({ name, player: \\\"opponentName\\\" })\\n    });\\n    console.log(\\\"1:\\\",response);\\n    const nameResponse = await response.json();\\n    console.log(\\\"nameResponse:\\\",nameResponse);\\n    if (!nameResponse.error) {\\n      $session.opponentName = nameResponse.name;\\n    }\\n  };\\n  \\n  socket.on(\\\"opponent score\\\", function(score) {\\n    console.log(\\\"player token score:\\\", score);\\n    sendScore(score, \\\"opponentScore\\\", false);\\n\\t});\\n\\n  function handleReset() {\\n    initUserPicked();\\n    housePicked = {};\\n    isHouseTokenPicked = false;\\n    gameFinished = false;\\n    win = false;\\n    isDraw = false;\\n  }\\n</script>\\n<style>\\n  .Tokens {\\n    display: grid;\\n    grid-template-columns: 130px 130px;\\n    justify-content: center;\\n    justify-items: center;\\n    position: relative;\\n    gap: 30px 50px;\\n  }\\n\\n  .Tokens .line {\\n    position: absolute;\\n    background: rgb(15,31,59);\\n    width: 200px;\\n    height: 14px;\\n    top: 58px;\\n    z-index: -1;\\n    display: block;\\n  }\\n\\n  .Tokens .line:before,\\n  .Tokens .line:after {\\n    content: \\\"\\\";\\n    position: absolute;\\n    background: rgb(15,31,59);\\n    height: 14px;\\n    left: 0;\\n    top: 0;\\n    width: 200px;\\n  }\\n\\n  .Tokens .line:before {\\n    transform: rotate(60deg);\\n    transform-origin: left top;\\n  }\\n  .Tokens .line:after {\\n    transform: rotate(-60deg);\\n    transform-origin: right top;\\n  }\\n\\n  @media screen and (min-width: 768px) {\\n    .Tokens {\\n      grid-template-columns: 230px 230px;\\n      gap: 50px 50px;\\n      margin: 0;\\n    }\\n\\n    .Tokens .line {\\n      width: 300px;\\n      top: 90px;\\n    }\\n\\n    .Tokens .line:before,\\n    .Tokens .line:after {\\n      width: 300px;\\n    }\\n  }\\n\\n  @media screen and (min-width: 1024px) {\\n    .Tokens.picked {\\n      grid-template-columns: 320px 320px;\\n    }\\n\\n    .Tokens.finished {\\n      grid-template-columns: 300px 110px 110px 300px;\\n    }\\n\\n  }\\n\\n</style>\\n<div class=\\\"Game\\\">\\n{JSON.stringify($session)}\\n  <div class=\\\"Tokens\\\" class:picked={isUserTokenPicked} class:finished={gameFinished}>\\n    {#if isUserTokenPicked}\\n      <Token {socket} {...$userPicked} whoPicked={$session.playerName || \\\"You\\\"} isWinner={gameFinished && win && !isDraw}/>\\n      <Token {socket} {...housePicked} whoPicked={$session.opponentName || \\\"Enemy\\\"} isWinner={gameFinished && !win && !isDraw} {isChanging}/>\\n    {:else}\\n      <span class=\\\"line\\\"></span>\\n      {#each tokens as item}\\n        <Token {socket} {...item}/>\\n      {/each}\\n    {/if}\\n    {#if gameFinished}\\n      <Result result={isDraw? \\\"DRAW\\\" : win ? \\\"YOU WIN\\\" : \\\"YOU LOSE\\\"} {handleReset} />\\n    {/if}\\n  </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAqJE,OAAO,4BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,KAAK,CAAC,KAAK,CAClC,eAAe,CAAE,MAAM,CACvB,aAAa,CAAE,MAAM,CACrB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CAAC,IAAI,AAChB,CAAC,AAED,qBAAO,CAAC,KAAK,cAAC,CAAC,AACb,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CACzB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,AAChB,CAAC,AAED,qBAAO,CAAC,mBAAK,OAAO,CACpB,qBAAO,CAAC,mBAAK,MAAM,AAAC,CAAC,AACnB,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CACzB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,KAAK,AACd,CAAC,AAED,qBAAO,CAAC,mBAAK,OAAO,AAAC,CAAC,AACpB,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,gBAAgB,CAAE,IAAI,CAAC,GAAG,AAC5B,CAAC,AACD,qBAAO,CAAC,mBAAK,MAAM,AAAC,CAAC,AACnB,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,gBAAgB,CAAE,KAAK,CAAC,GAAG,AAC7B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,OAAO,4BAAC,CAAC,AACP,qBAAqB,CAAE,KAAK,CAAC,KAAK,CAClC,GAAG,CAAE,IAAI,CAAC,IAAI,CACd,MAAM,CAAE,CAAC,AACX,CAAC,AAED,qBAAO,CAAC,KAAK,cAAC,CAAC,AACb,KAAK,CAAE,KAAK,CACZ,GAAG,CAAE,IAAI,AACX,CAAC,AAED,qBAAO,CAAC,mBAAK,OAAO,CACpB,qBAAO,CAAC,mBAAK,MAAM,AAAC,CAAC,AACnB,KAAK,CAAE,KAAK,AACd,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACrC,OAAO,OAAO,4BAAC,CAAC,AACd,qBAAqB,CAAE,KAAK,CAAC,KAAK,AACpC,CAAC,AAED,OAAO,SAAS,4BAAC,CAAC,AAChB,qBAAqB,CAAE,KAAK,CAAC,KAAK,CAAC,KAAK,CAAC,KAAK,AAChD,CAAC,AAEH,CAAC\"}"
};

const Game = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $session;
	let $userPicked = get_store_value(userPicked);
	const { session } = stores$1();
	$session = get_store_value(session);
	console.log("sessions");
	console.log(session);
	console.log($session);
	let { socket } = $$props;
	socket.emit("message", "game rendered!");
	let housePicked = {};
	let isHouseTokenPicked = false;
	let gameFinished = false;
	let win = false;
	let isDraw = false;
	let isChanging = false;

	//$: if(($userPicked.name !== undefined) && (housePicked.name == undefined)) pickHouseToken()
	if ($session.gameRoom) {
		if ($session.isHost) {
			socket.emit("createRoom", {
				room: $session.gameRoom,
				playerName: $session.playerName,
				message: ""
			});
		} else {
			socket.emit("joinRoom", {
				room: $session.gameRoom,
				playerName: $session.playerName,
				message: ""
			});
		}
	}

	const sendScore = async (score, player, sendScore) => {
		console.log("2", score);
		let newScore = $session[player] + score;

		const response = await fetch("/api/score", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ newScore, counter: player })
		});

		console.log("1:", response);
		const scoreCountResponse = await response.json();
		console.log("scoreCountResponse:", scoreCountResponse);

		if (!scoreCountResponse.error) {
			$session[player] = scoreCountResponse.scoreCount;

			if (sendScore) {
				socket.emit("player score", { room: $session.gameRoom, score });
			}
		}
	};

	socket.on("player response", function (token) {
		console.log("player token response:", token);
		housePicked = token;
		isHouseTokenPicked = true;
	});

	socket.on("opponent join", function (opponentName) {
		console.log("opponent join:", opponentName);
		sendOpponentName(opponentName);

		socket.emit("host name", {
			room: $session.gameRoom,
			playerName: $session.playerName
		});
	});

	socket.on("host name", function (opponentName) {
		console.log("hostname join:", opponentName);
		sendOpponentName(opponentName);
	});

	const sendOpponentName = async name => {
		const response = await fetch("/api/player", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ name, player: "opponentName" })
		});

		console.log("1:", response);
		const nameResponse = await response.json();
		console.log("nameResponse:", nameResponse);

		if (!nameResponse.error) {
			$session.opponentName = nameResponse.name;
		}
	};

	socket.on("opponent score", function (score) {
		console.log("player token score:", score);
		sendScore(score, "opponentScore", false);
	});

	function handleReset() {
		initUserPicked();
		housePicked = {};
		isHouseTokenPicked = false;
		gameFinished = false;
		win = false;
		isDraw = false;
	}

	if ($$props.socket === void 0 && $$bindings.socket && socket !== void 0) $$bindings.socket(socket);
	$$result.css.add(css$5);
	$session = get_store_value(session);
	let isUserTokenPicked = $userPicked.name !== undefined;

	 {
		if (isHouseTokenPicked & isUserTokenPicked) {
			if ($userPicked.name == housePicked.name) {
				isDraw = true;
			} else {
				win = $userPicked.winTo == housePicked.name;

				//scoreCount.update(current => win? current + 1 : (current == 0)? current : current -1);
				let newCount = win ? 1 : 0;

				sendScore(newCount, "playerScore", true);
			}

			gameFinished = true;
		}
	}

	return `<div class="${"Game"}">${escape(JSON.stringify($session))}
  <div class="${[
		"Tokens svelte-pwwj1f",
		(isUserTokenPicked ? "picked" : "") + " " + (gameFinished ? "finished" : "")
	].join(" ").trim()}">${isUserTokenPicked
	? `${validate_component(Token, "Token").$$render($$result, Object.assign({ socket }, $userPicked, { whoPicked: $session.playerName || "You" }, { isWinner: gameFinished && win && !isDraw }), {}, {})}
      ${validate_component(Token, "Token").$$render(
			$$result,
			Object.assign(
				{ socket },
				housePicked,
				{
					whoPicked: $session.opponentName || "Enemy"
				},
				{
					isWinner: gameFinished && !win && !isDraw
				},
				{ isChanging }
			),
			{},
			{}
		)}`
	: `<span class="${"line svelte-pwwj1f"}"></span>
      ${each(tokens, item => `${validate_component(Token, "Token").$$render($$result, Object.assign({ socket }, item), {}, {})}`)}`}
    ${gameFinished
	? `${validate_component(Result, "Result").$$render(
			$$result,
			{
				result: isDraw ? "DRAW" : win ? "YOU WIN" : "YOU LOSE",
				handleReset
			},
			{},
			{}
		)}`
	: ``}</div></div>`;
});

/* src/components/Modal.svelte generated by Svelte v3.23.2 */

const css$6 = {
	code: ".Modal.svelte-1t7154g{position:relative}.Modal-overlay.svelte-1t7154g{background-color:hsla(0, 0%, 0%, 0.5);position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;z-index:9;cursor:pointer}",
	map: "{\"version\":3,\"file\":\"Modal.svelte\",\"sources\":[\"Modal.svelte\"],\"sourcesContent\":[\"<style>\\n  .Modal {\\n    position: relative;\\n  }\\n  .Modal-overlay {\\n    background-color: hsla(0, 0%, 0%, 0.5);\\n    position: fixed;\\n    width: 100%;\\n    height: 100%;\\n    top: 0;\\n    left: 0;\\n    right: 0;\\n    bottom: 0;\\n    z-index: 9;\\n    cursor: pointer;\\n  }\\n</style>\\n\\n<div class=\\\"Modal\\\">\\n  <div class=\\\"Modal-overlay\\\" />\\n  <slot />\\n</div>\"],\"names\":[],\"mappings\":\"AACE,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,AACpB,CAAC,AACD,cAAc,eAAC,CAAC,AACd,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACtC,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,OAAO,AACjB,CAAC\"}"
};

const Modal = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$6);

	return `<div class="${"Modal svelte-1t7154g"}"><div class="${"Modal-overlay svelte-1t7154g"}"></div>
  ${$$slots.default ? $$slots.default({}) : ``}</div>`;
});

/* src/components/Rules.svelte generated by Svelte v3.23.2 */

const css$7 = {
	code: ".Rules.svelte-9qvm94.svelte-9qvm94{height:12vh;text-align:center}.Rules-container.svelte-9qvm94.svelte-9qvm94{border:1px solid hsl(0, 0%, 100%);border-radius:8px;padding:10px 37px;cursor:pointer;color:hsl(0, 0%, 100%);display:inline-block;text-align:center}.Rules-container.svelte-9qvm94 h2.svelte-9qvm94{font-size:16px;letter-spacing:2.5px;font-weight:600}.Rules-container.svelte-9qvm94.svelte-9qvm94:hover{color:hsl(217, 16%, 45%);background:hsl(0, 0%, 100%);border-color:hsl(0, 0%, 100%)}@media screen and (min-width: 768px){.Rules.svelte-9qvm94.svelte-9qvm94{right:0;left:auto;transform:none;position:fixed}.Rules-container.svelte-9qvm94.svelte-9qvm94{margin:0px 20px 20px}}@media screen and (min-width: 1024px){.Rules-container.svelte-9qvm94.svelte-9qvm94{margin:0px 30px 30px}}",
	map: "{\"version\":3,\"file\":\"Rules.svelte\",\"sources\":[\"Rules.svelte\"],\"sourcesContent\":[\"<script>\\n  import { blur } from 'svelte/transition';\\n  import { showModal } from '../store/store.js';\\n  import Modal from './Modal.svelte';\\n  let isModal = true;\\n\\n  let handleClick = () => showModal.update(current => !current);\\n</script>\\n<style>\\n  /* .Rules {\\n    position: fixed;\\n    bottom: 0;\\n    left: 50%;\\n    transform: translateX(-50%);\\n  } */\\n\\n  .Rules {\\n    height: 12vh;\\n    text-align: center;\\n  }\\n\\n  .Rules-container {\\n    border: 1px solid hsl(0, 0%, 100%);\\n    border-radius: 8px;\\n    padding: 10px 37px;\\n    cursor: pointer;\\n    color: hsl(0, 0%, 100%);\\n    display: inline-block;\\n    text-align: center;\\n  }\\n\\n  .Rules-container h2 {\\n    font-size: 16px;\\n    letter-spacing: 2.5px;\\n    font-weight: 600;\\n  }\\n\\n  .Rules-container:hover {\\n    color: hsl(217, 16%, 45%);\\n    background: hsl(0, 0%, 100%);\\n    border-color: hsl(0, 0%, 100%);\\n  }\\n\\n  @media screen and (min-width: 768px) {\\n    .Rules {\\n      right: 0;\\n      left: auto;\\n      transform: none;\\n      position: fixed;\\n    }\\n\\n    .Rules-container {\\n      margin: 0px 20px 20px;\\n    }\\n  }\\n\\n  @media screen and (min-width: 1024px) {\\n    .Rules-container {\\n      margin: 0px 30px 30px;\\n    }\\n  }\\n</style>\\n\\n<div class=\\\"Rules\\\">\\n  <div class=\\\"Rules-container\\\" on:click={handleClick}>\\n      <h2>RULES</h2>\\n  </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAgBE,MAAM,4BAAC,CAAC,AACN,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAClC,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CACvB,OAAO,CAAE,YAAY,CACrB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,8BAAgB,CAAC,EAAE,cAAC,CAAC,AACnB,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,KAAK,CACrB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,4CAAgB,MAAM,AAAC,CAAC,AACtB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACzB,UAAU,CAAE,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAC5B,YAAY,CAAE,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,AAChC,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,MAAM,4BAAC,CAAC,AACN,KAAK,CAAE,CAAC,CACR,IAAI,CAAE,IAAI,CACV,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,KAAK,AACjB,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,AACvB,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AACrC,gBAAgB,4BAAC,CAAC,AAChB,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,AACvB,CAAC,AACH,CAAC\"}"
};

const Rules = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$7);
	return `<div class="${"Rules svelte-9qvm94"}"><div class="${"Rules-container svelte-9qvm94"}"><h2 class="${"svelte-9qvm94"}">RULES</h2></div></div>`;
});

const img$3 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='304' height='270'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='white' stop-opacity='.097'/%3e%3cstop offset='100%25' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient id='b' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='white' stop-opacity='.097'/%3e%3cstop offset='100%25' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg fill='none' fill-rule='evenodd'%3e%3cellipse cx='53.189' cy='54.815' fill='%23B1B4C5' rx='53.189' ry='54.815'/%3e%3cellipse cx='53.189' cy='52.385' fill='url(%23a)' rx='53.189' ry='52.385'/%3e%3cg transform='translate(12.357 12.421)'%3e%3cellipse cx='40.832' cy='41.044' fill='%23E1E4ED' rx='40.832' ry='41.044'/%3e%3cpath fill='%238A90AC' fill-rule='nonzero' d='M56.697 30.417a2.125 2.125 0 00-.904-.146c-.417.03-.755.201-.955.481-1.177 1.666-2.141 4.81-2.919 7.337-.357 1.169-.836 2.733-1.183 3.475-.362-2.08.047-9.697.206-12.63l.002-.047c.11-2.038.125-2.396.1-2.553-.174-1.118-.618-1.852-1.319-2.18-.708-.333-1.629-.186-2.62.417-.497.303-.635 1.345-1.061 6.067l-.002.02c-.235 2.595-.776 8.568-1.441 9.563-.75-1.392-1.784-9.3-2.23-12.722-.312-2.397-.494-3.774-.616-4.19-.257-.87-1.343-1.611-2.418-1.653-.895-.044-1.629.415-1.98 1.214-.655.736-.423 3.179.302 8.964.344 2.754 1.056 8.441.608 9.08-.893-.099-2.427-3.661-4.559-10.592-.598-1.942-.783-2.525-.967-2.78-.362-.891-1.593-1.578-2.696-1.5a2.314 2.314 0 00-.277.036c-.578.116-1.896.653-1.615 3.13.779 3.435 1.624 5.957 2.445 8.405l.016.05c.491 1.465.955 2.85 1.387 4.388 1.016 3.63.621 5.882.616 5.907-.034.232-.105.374-.211.423a.405.405 0 01-.143.033c-.322.023-.805-.193-1.055-.333-.568-1.098-3.4-6.33-5.967-7.055L25.15 41l-.093.008c-.942.09-1.634.45-2.057 1.068-.67.978-.393 2.224-.325 2.474l.038.09c.02.037 2.079 3.825 2.397 5.587.275 1.511 1.696 3.148 2.838 4.464l.047.054c.373.43.695.802.948 1.146 3.316 3.492 8.558 6.428 8.601 6.452.654.487 1.018.958 1.056 1.363a.595.595 0 01-.117.43l-.114.12.725.711 13.832-.98.59-2.73c1.823-7.705 1.442-14.275 1.436-14.319.007-.242.518-2.58.93-4.468l.011-.048c.82-3.763 1.838-8.444 2.034-10.225.085-.761-.398-1.46-1.23-1.779z'/%3e%3c/g%3e%3cg transform='translate(196)'%3e%3cellipse cx='53.686' cy='54.815' fill='%23B1B4C5' rx='53.686' ry='54.815'/%3e%3cellipse cx='53.686' cy='52.385' fill='url(%23b)' rx='53.686' ry='52.385'/%3e%3cg transform='translate(12.473 12.421)'%3e%3cellipse cx='41.214' cy='41.044' fill='%23E1E4ED' rx='41.214' ry='41.044'/%3e%3cpath fill='%238A90AC' fill-rule='nonzero' d='M30.455 40.692l4.451-6.234c-1.85-.307-5.248-.375-8.031 2.397-4.388 4.37-6.165 13.809-6.535 16.093l11.15 11.105c2.008-.17 10.896-1.353 19.46-9.881.09-.184 2.177-1.72.471-3.418-.814-.81-2.162-.796-2.993.033a1.051 1.051 0 01-1.497.015 1.04 1.04 0 01.015-1.49l3.026-3.014c1.538-1.532.089-4.116-2.058-3.495l-2.477 2.112a1.065 1.065 0 01-1.497-.103c-.384-.443-.302-1.114.135-1.492 8.654-7.562 7.39-6.65 12.958-11.848 2.08-1.725-.536-4.776-2.586-3.03L40.978 40.506a1.051 1.051 0 01-1.378-.015c-.445-.383-.455-.934-.164-1.37l9.395-14.545c1.373-1.852-1.33-3.91-2.776-2.042L32.164 41.881a1.05 1.05 0 01-1.47.255 1.02 1.02 0 01-.24-1.444z'/%3e%3c/g%3e%3c/g%3e%3cg transform='translate(98 160)'%3e%3cellipse cx='53.686' cy='54.815' fill='%23B1B4C5' rx='53.686' ry='54.815'/%3e%3cellipse cx='53.686' cy='52.385' fill='url(%23b)' rx='53.686' ry='52.385'/%3e%3cg transform='translate(12.473 12.421)'%3e%3cellipse cx='41.214' cy='41.044' fill='%23E1E4ED' rx='41.214' ry='41.044'/%3e%3cpath fill='%238A90AC' fill-rule='nonzero' d='M57.179 35.15c-.475-5.997-7.208-5.385-7.208-5.385-2.842-5.01-7.281-1.381-7.281-1.381-3.41-4.911-7.687-.36-7.687-.36-7.373-.796-7.087 5.234-7.087 5.234-.173 1.917 1.04 7.847 1.04 7.847-1.094-3.418-3.467-.581-3.467-.581-2.917 4.502-.721 6.967-.721 6.967 3.947 4.626 12.357 10.18 12.357 10.18 3.046 1.745 1.757 3.3 1.757 3.3l18.42-3.044.424-3.494c2.8-8.472-.547-19.284-.547-19.284z'/%3e%3c/g%3e%3c/g%3e%3ctext fill='%23B1B4C5' font-family='BarlowSemiCondensed-Bold%2c Barlow Semi Condensed' font-size='13' font-style='condensed' font-weight='bold'%3e%3ctspan x='134' y='31'%3eBEATS%3c/tspan%3e%3c/text%3e%3ctext fill='%23B1B4C5' font-family='BarlowSemiCondensed-Bold%2c Barlow Semi Condensed' font-size='13' font-style='condensed' font-weight='bold'%3e%3ctspan x='40' y='147'%3eBEATS%3c/tspan%3e%3c/text%3e%3ctext fill='%23B1B4C5' font-family='BarlowSemiCondensed-Bold%2c Barlow Semi Condensed' font-size='13' font-style='condensed' font-weight='bold'%3e%3ctspan x='235' y='147'%3eBEATS%3c/tspan%3e%3c/text%3e%3cg fill='%23B1B4C5' transform='matrix(-1 0 0 1 177 39)'%3e%3crect width='50' height='4' y='10' rx='2'/%3e%3cpath d='M41.963 2.015l8.59 8.728c.716.727.71 1.896-.013 2.616a1.833 1.833 0 01-2.6-.013l-8.59-8.728a1.855 1.855 0 01.013-2.616 1.833 1.833 0 012.6.013z'/%3e%3cpath d='M39.35 19.382l8.59-8.728a1.833 1.833 0 012.6-.013c.723.72.729 1.889.013 2.616l-8.59 8.728a1.833 1.833 0 01-2.6.013 1.855 1.855 0 01-.013-2.616z'/%3e%3c/g%3e%3cg fill='%23B1B4C5' transform='scale(1 -1) rotate(-55 -82.574 -131.195)'%3e%3crect width='50' height='4' y='10' rx='2'/%3e%3cpath d='M41.963 2.015l8.59 8.728c.716.727.71 1.896-.013 2.616a1.833 1.833 0 01-2.6-.013l-8.59-8.728a1.855 1.855 0 01.013-2.616 1.833 1.833 0 012.6.013z'/%3e%3cpath d='M39.35 19.382l8.59-8.728a1.833 1.833 0 012.6-.013c.723.72.729 1.889.013 2.616l-8.59 8.728a1.833 1.833 0 01-2.6.013 1.855 1.855 0 01-.013-2.616z'/%3e%3c/g%3e%3cg fill='%23B1B4C5' transform='rotate(-55 240.022 -103.651)'%3e%3crect width='50' height='4' y='10' rx='2'/%3e%3cpath d='M41.963 2.015l8.59 8.728c.716.727.71 1.896-.013 2.616a1.833 1.833 0 01-2.6-.013l-8.59-8.728a1.855 1.855 0 01.013-2.616 1.833 1.833 0 012.6.013z'/%3e%3cpath d='M39.35 19.382l8.59-8.728a1.833 1.833 0 012.6-.013c.723.72.729 1.889.013 2.616l-8.59 8.728a1.833 1.833 0 01-2.6.013 1.855 1.855 0 01-.013-2.616z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

const img$4 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3e%3cpath fill='%233B4262' fill-rule='evenodd' d='M16.97 0l2.122 2.121-7.425 7.425 7.425 7.425-2.121 2.12-7.425-7.424-7.425 7.425L0 16.97l7.425-7.425L0 2.121 2.121 0l7.425 7.425L16.971 0z' opacity='.25'/%3e%3c/svg%3e";

/* src/components/GameRules.svelte generated by Svelte v3.23.2 */

const css$8 = {
	code: ".Share.svelte-1c30l6k{position:fixed;background-color:white;left:0px;right:0px;top:0px;bottom:0px;z-index:9;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between;flex-direction:column;background:white;padding:4em 0px}h2.svelte-1c30l6k{font-size:32px;font-weight:700;line-height:32px;color:hsl(229, 24.8%, 30.8%)}.close.svelte-1c30l6k{cursor:pointer}@media screen and (min-width: 768px){.Share.svelte-1c30l6k{border-radius:8px;background-color:white;width:336px;height:352px;position:fixed;z-index:9;padding:32px;display:block;top:50%;left:50%;transform:translate(-200px, -208px)}h2.svelte-1c30l6k{text-align:left}.rules.svelte-1c30l6k{margin-top:55px}.close.svelte-1c30l6k{position:absolute;top:0;right:0;margin-top:38px;margin-right:32px}}",
	map: "{\"version\":3,\"file\":\"GameRules.svelte\",\"sources\":[\"GameRules.svelte\"],\"sourcesContent\":[\"<script>\\n  import { showModal } from '../store/store.js';\\n  import GameRulesImage from '../images/image-rules.svg';\\n  import GameRulesClose from '../images/icon-close.svg';\\n  let handleClick = () => showModal.update(current => !current);\\n</script>\\n<style>\\n  .Share {\\n    position: fixed;\\n    background-color: white;\\n    left: 0px;\\n    right: 0px;\\n    top: 0px;\\n    bottom: 0px;\\n    z-index: 9;\\n    display: flex;\\n    -webkit-box-align: center;\\n    align-items: center;\\n    -webkit-box-pack: justify;\\n    justify-content: space-between;\\n    flex-direction: column;\\n    background: white;\\n    padding: 4em 0px;\\n  }\\n\\n  h2 {\\n    font-size: 32px;\\n    font-weight: 700;\\n    line-height: 32px;\\n    color: hsl(229, 24.8%, 30.8%);\\n  }\\n  \\n  .close {\\n    cursor: pointer;\\n  }\\n\\n  @media screen and (min-width: 768px) {\\n    .Share {\\n      border-radius: 8px;\\n      background-color: white;\\n      width: 336px;\\n      height: 352px;\\n      position: fixed;\\n      z-index: 9;\\n      padding: 32px;\\n      display: block;\\n      top: 50%;\\n      left: 50%;\\n      transform: translate(-200px, -208px);\\n    }\\n\\n    h2 {\\n      text-align: left;\\n    }\\n\\n    .rules {\\n      margin-top: 55px;\\n    }\\n\\n    .close {\\n      position: absolute;\\n      top: 0;\\n      right: 0;\\n      margin-top: 38px;\\n      margin-right: 32px;\\n    }\\n  }\\n\\n</style>\\n\\n<div class=\\\"Share\\\">\\n  <h2>RULES</h2>\\n  <img class=\\\"rules\\\" src={GameRulesImage} alt=\\\"\\\">\\n  <img class=\\\"close\\\" src={GameRulesClose} alt=\\\"\\\" on:click={handleClick}>\\n</div>\"],\"names\":[],\"mappings\":\"AAOE,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,KAAK,CACf,gBAAgB,CAAE,KAAK,CACvB,IAAI,CAAE,GAAG,CACT,KAAK,CAAE,GAAG,CACV,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,iBAAiB,CAAE,MAAM,CACzB,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,OAAO,CACzB,eAAe,CAAE,aAAa,CAC9B,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,GAAG,CAAC,GAAG,AAClB,CAAC,AAED,EAAE,eAAC,CAAC,AACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,AAC/B,CAAC,AAED,MAAM,eAAC,CAAC,AACN,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,MAAM,eAAC,CAAC,AACN,aAAa,CAAE,GAAG,CAClB,gBAAgB,CAAE,KAAK,CACvB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,KAAK,CACd,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,MAAM,CAAC,CAAC,MAAM,CAAC,AACtC,CAAC,AAED,EAAE,eAAC,CAAC,AACF,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,MAAM,eAAC,CAAC,AACN,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,IAAI,AACpB,CAAC,AACH,CAAC\"}"
};

const GameRules = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$8);

	return `<div class="${"Share svelte-1c30l6k"}"><h2 class="${"svelte-1c30l6k"}">RULES</h2>
  <img class="${"rules svelte-1c30l6k"}"${add_attribute("src", img$3, 0)} alt="${""}">
  <img class="${"close svelte-1c30l6k"}"${add_attribute("src", img$4, 0)} alt="${""}"></div>`;
});

/* src/routes/index.svelte generated by Svelte v3.23.2 */

const css$9 = {
	code: "@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap');html{height:100%}body{background-image:radial-gradient(circle at center top, rgb(31, 55, 87) 20%, rgb(19, 21, 55) 100%);height:100%;color:white;font-family:'Barlow Semi Condensed', sans-serif;margin:0;padding:0;text-align:center}h1, h2, h3{margin:0;padding:0}#messages.svelte-kkj6ec{color:black}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<style>\\n  @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap');\\n\\n  :global(html) {\\n    height: 100%;\\n  }\\n\\n  :global(body) {\\n    background-image: radial-gradient(circle at center top, rgb(31, 55, 87) 20%, rgb(19, 21, 55) 100%);\\n    height: 100%;\\n    color: white;\\n    font-family: 'Barlow Semi Condensed', sans-serif;\\n    margin: 0;\\n    padding: 0;\\n    text-align: center;\\n  }\\n\\n  :global(h1, h2, h3) {\\n    margin: 0;\\n    padding: 0;\\n  }\\n\\n  #messages {\\n    color: black;\\n  }\\n</style>\\n\\n<script>\\n  import { fade } from \\\"svelte/transition\\\";\\n  import { blur } from 'svelte/transition';\\n  import { onMount } from 'svelte';\\n\\n  import { goto, stores } from '@sapper/app';\\n  \\n  import io from \\\"socket.io-client\\\";\\n\\n  import { showModal } from '../store/store.js';\\n  import Header from '../components/Header.svelte';\\n  import Main from '../components/Main.svelte';\\n  import Game from '../components/Game.svelte';\\n  import Rules from '../components/Rules.svelte';\\n  import GameRules from '../components/GameRules.svelte';\\n  import Modal from '../components/Modal.svelte';\\n\\n  const { session } = stores();\\n\\n  const socket = io();\\n\\n  const placeholder = \\\"Type your name here...\\\";\\n  let message = \\\"\\\";\\n  let name = \\\"\\\";\\n  let roomName = \\\"room-ma123\\\";\\n  let messages = [];\\n  let numUsersConnected = 0;\\n  let error = \\\"\\\";\\n\\n  console.log(\\\"pname:\\\",$session)\\n  \\n  socket.on(\\\"message\\\", function(message) {\\t\\t\\n    console.log(\\\"message received: \\\" + message);\\n\\t\\tmessages = messages.concat(message);\\n\\t});\\n\\n  socket.on(\\\"user joined\\\", function({message, numUsers}) {\\n    messages = messages.concat(message);\\n\\t\\tnumUsersConnected = numUsers;\\n  });\\n  \\n  socket.on(\\\"no room\\\", function(msg) {\\n    console.log(\\\"no room:\\\", msg);\\n    sendGameRoom(undefined, true);\\n    error = msg;\\n\\t});\\n  \\n  socket.on(\\\"joined room\\\", function(room) {\\n    console.log(\\\"joined room:\\\", room);\\n    sendGameRoom(room, false);\\n\\t});\\n\\n  function handlePlayerNameSubmit() {\\n\\t\\tname = name.trim();\\n\\t\\tif (name == '') {\\n\\t\\t\\treturn;\\n    }\\n    sendPlayerName(name);\\n    let messageString = `Server: Anonymous changed their nickname to ${name}`;\\n    messages = messages.concat(messageString);\\n    \\n\\t\\tsocket.emit(\\\"message\\\", messageString);\\n  }\\n  \\n  const sendPlayerName = async (name) => {\\n    const response = await fetch(\\\"/api/player\\\", {\\n      method: \\\"POST\\\",\\n      headers: {\\n        \\\"Content-Type\\\": \\\"application/json\\\",\\n        Accept: \\\"application/json\\\"\\n      },\\n      body: JSON.stringify({ name, player: \\\"playerName\\\" })\\n    });\\n    console.log(\\\"1:\\\",response);\\n    const nameResponse = await response.json();\\n    console.log(\\\"nameResponse:\\\",nameResponse);\\n    if (!nameResponse.error) {\\n      $session.playerName = nameResponse.name;\\n    }\\n  };\\n\\n  function handleCreateRoom() {\\n    let room = \\\"room-\\\" + $session.playerName + \\\"123\\\";\\n    let messageString = `${$session.playerName}: Created a room ${room}`;\\n    sendGameRoom(room, true)\\n\\t\\tsocket.emit(\\\"createRoom\\\", {\\n      room: room,\\n      playerName: $session.playerName,\\n      message: messageString\\n    });\\n    socket.emit(\\\"message\\\", messageString);\\n    //goto(\\\"/game\\\");\\n  }\\n\\n  const sendGameRoom = async (gameRoom, isHost) => {\\n    const response = await fetch(\\\"/api/room\\\", {\\n      method: \\\"POST\\\",\\n      headers: {\\n        \\\"Content-Type\\\": \\\"application/json\\\",\\n        Accept: \\\"application/json\\\"\\n      },\\n      body: JSON.stringify({ gameRoom, isHost })\\n    });\\n    console.log(\\\"1:\\\",response);\\n    const gameRoomResponse = await response.json();\\n    console.log(\\\"gameRoomResponse:\\\",gameRoomResponse);\\n    if (!gameRoomResponse.error) {\\n      $session.gameRoom = gameRoomResponse.gameRoom;\\n      $session.isHost = gameRoomResponse.isHost;\\n    }\\n  };\\n  \\n  function handleRoomSubmit() {\\n    console.log(\\\"room subm\\\")\\n    roomName = roomName.trim();\\n    socket.emit(\\\"joinRoom\\\", {\\n      room: roomName,\\n      playerName : $session.playerName,\\n      message: $session.playerName + \\\"has joined private room: \\\" + roomName\\n    });\\n    //io.sockets.in(\\\"room\\\").emit('message', \\\"You are in private room.\\\" + messageString);\\n  }\\n</script>\\n\\n{error}\\n{#if $session.gameRoom}\\n  <span>CURRENT ROOM: {$session.gameRoom}</span>\\n  {#if $showModal}\\n    <div transition:blur={{duration:90}}>\\n      <Modal>\\n        <GameRules />\\n      </Modal>\\n    </div>\\n  {/if}\\n  <Header></Header>\\n  <Main>\\n    <Game {socket}/>\\n  </Main>\\n  <Rules/>\\n{:else}\\n  {#if !$session.playerName}\\n    <form action=\\\"\\\">\\n      <input id=\\\"m\\\" autocomplete=\\\"off\\\" {placeholder} bind:value={name} />\\n      <button on:click|preventDefault={handlePlayerNameSubmit}>Send</button>\\n    </form>\\n  {:else}\\n    <form action=\\\"\\\">\\n      <button on:click|preventDefault={handleCreateRoom}>Create Room</button>\\n    </form>\\n    <form action=\\\"\\\">\\n      <input id=\\\"m\\\" autocomplete=\\\"off\\\" {placeholder} bind:value={roomName} />\\n      <button on:click|preventDefault={handleRoomSubmit}>joinRoom</button>\\n    </form>\\n    <p id=\\\"numUsers\\\">There {numUsersConnected == 1 ? 'is' : 'are'} {numUsersConnected} {numUsersConnected == 1 ? 'user' : 'users'} currently chatting!</p>\\n    <div id=\\\"chatWindow\\\">\\n      <ul id=\\\"messages\\\">\\n        {#each messages as message}\\n          <li transition:fade>{message}</li>\\n        {/each}\\n      </ul>\\n    </div>\\n  {/if}\\n{/if}\"],\"names\":[],\"mappings\":\"AACE,QAAQ,IAAI,0FAA0F,CAAC,CAAC,AAEhG,IAAI,AAAE,CAAC,AACb,MAAM,CAAE,IAAI,AACd,CAAC,AAEO,IAAI,AAAE,CAAC,AACb,gBAAgB,CAAE,gBAAgB,MAAM,CAAC,EAAE,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAClG,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,uBAAuB,CAAC,CAAC,UAAU,CAChD,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,MAAM,AACpB,CAAC,AAEO,UAAU,AAAE,CAAC,AACnB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,SAAS,cAAC,CAAC,AACT,KAAK,CAAE,KAAK,AACd,CAAC\"}"
};

const placeholder = "Type your name here...";

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $session;
	let $showModal = get_store_value(showModal);
	const { session } = stores$1();
	$session = get_store_value(session);
	const socket = io();
	let name = "";
	let roomName = "room-ma123";
	let messages = [];
	let numUsersConnected = 0;
	let error = "";
	console.log("pname:", $session);

	socket.on("message", function (message) {
		console.log("message received: " + message);
		messages = messages.concat(message);
	});

	socket.on("user joined", function ({ message, numUsers }) {
		messages = messages.concat(message);
		numUsersConnected = numUsers;
	});

	socket.on("no room", function (msg) {
		console.log("no room:", msg);
		sendGameRoom(undefined, true);
		error = msg;
	});

	socket.on("joined room", function (room) {
		console.log("joined room:", room);
		sendGameRoom(room, false);
	});

	const sendGameRoom = async (gameRoom, isHost) => {
		const response = await fetch("/api/room", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ gameRoom, isHost })
		});

		console.log("1:", response);
		const gameRoomResponse = await response.json();
		console.log("gameRoomResponse:", gameRoomResponse);

		if (!gameRoomResponse.error) {
			$session.gameRoom = gameRoomResponse.gameRoom;
			$session.isHost = gameRoomResponse.isHost;
		}
	};

	$$result.css.add(css$9);
	$session = get_store_value(session);

	return `${escape(error)}
${$session.gameRoom
	? `<span>CURRENT ROOM: ${escape($session.gameRoom)}</span>
  ${$showModal
		? `<div>${validate_component(Modal, "Modal").$$render($$result, {}, {}, {
				default: () => `${validate_component(GameRules, "GameRules").$$render($$result, {}, {}, {})}`
			})}</div>`
		: ``}
  ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
  ${validate_component(Main, "Main").$$render($$result, {}, {}, {
			default: () => `${validate_component(Game, "Game").$$render($$result, { socket }, {}, {})}`
		})}
  ${validate_component(Rules, "Rules").$$render($$result, {}, {}, {})}`
	: `${!$session.playerName
		? `<form action="${""}"><input id="${"m"}" autocomplete="${"off"}"${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", name, 1)}>
      <button>Send</button></form>`
		: `<form action="${""}"><button>Create Room</button></form>
    <form action="${""}"><input id="${"m"}" autocomplete="${"off"}"${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", roomName, 1)}>
      <button>joinRoom</button></form>
    <p id="${"numUsers"}">There ${escape(numUsersConnected == 1 ? "is" : "are")} ${escape(numUsersConnected)} ${escape(numUsersConnected == 1 ? "user" : "users")} currently chatting!</p>
    <div id="${"chatWindow"}"><ul id="${"messages"}" class="${"svelte-kkj6ec"}">${each(messages, message => `<li>${escape(message)}</li>`)}</ul></div>`}`}`;
});

/* src/routes/about.svelte generated by Svelte v3.23.2 */

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `${($$result.title = `<title>About</title>`, "")}`, "")}

<h1>About this site</h1>

<p>This is the &#39;about&#39; page. There&#39;s not much here.</p>`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.23.2 */

const css$a = {
	code: "ul.svelte-1frg2tf{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport function preload({ params, query }) {\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\t\\treturn { posts };\\n\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let posts;\\n</script>\\n\\n<style>\\n\\tul {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tline-height: 1.5;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\n\\t{/each}\\n</ul>\"],\"names\":[],\"mappings\":\"AAaC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$a);

	return `${($$result.head += `${($$result.title = `<title>Blog</title>`, "")}`, "")}

<h1>Recent posts</h1>

<ul class="${"svelte-1frg2tf"}">${each(posts, post => `
		<li><a rel="${"prefetch"}" href="${"blog/" + escape(post.slug)}">${escape(post.title)}</a></li>`)}</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.23.2 */

const css$b = {
	code: ".content.svelte-gnxal1 h2{font-size:1.4em;font-weight:500}.content.svelte-gnxal1 pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-gnxal1 pre code{background-color:transparent;padding:0}.content.svelte-gnxal1 ul{line-height:1.5}.content.svelte-gnxal1 li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload({ params, query }) {\\n\\t\\t// the `slug` parameter is available because\\n\\t\\t// this file is called [slug].svelte\\n\\t\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\n\\t\\tconst data = await res.json();\\n\\n\\t\\tif (res.status === 200) {\\n\\t\\t\\treturn { post: data };\\n\\t\\t} else {\\n\\t\\t\\tthis.error(res.status, data.message);\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n</script>\\n\\n<style>\\n\\t/*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\t.content :global(h2) {\\n\\t\\tfont-size: 1.4em;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\t.content :global(pre) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\t\\tpadding: 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\toverflow-x: auto;\\n\\t}\\n\\n\\t.content :global(pre) :global(code) {\\n\\t\\tbackground-color: transparent;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.content :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.content :global(li) {\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{post.title}</title>\\n</svelte:head>\\n\\n<h1>{post.title}</h1>\\n\\n<div class='content'>\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$1({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$b);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.title)}</title>`, "")}`, "")}

<h1>${escape(post.title)}</h1>

<div class="${"content svelte-gnxal1"}">${post.html}</div>`;
});

/* src/routes/game/index.svelte generated by Svelte v3.23.2 */

const css$c = {
	code: "@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap');html{height:100%}body{background-image:radial-gradient(circle at center top, rgb(31, 55, 87) 20%, rgb(19, 21, 55) 100%);height:100%;color:white;font-family:'Barlow Semi Condensed', sans-serif;margin:0;padding:0;text-align:center}h1, h2, h3{margin:0;padding:0}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\n  import { onMount } from 'svelte';\\n  import { blur } from 'svelte/transition';\\n  import { showModal } from '../../store/store.js';\\n  import Header from '../../components/Header.svelte';\\n  import Main from '../../components/Main.svelte';\\n  import Game from '../../components/Game.svelte';\\n  import Rules from '../../components/Rules.svelte';\\n  import GameRules from '../../components/GameRules.svelte';\\n  import Modal from '../../components/Modal.svelte';\\n\\n  import { stores } from '@sapper/app';\\n  const { session } = stores();\\n</script>\\n\\n<style>\\n  @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap');\\n\\n  :global(html) {\\n    height: 100%;\\n  }\\n\\n  :global(body) {\\n    background-image: radial-gradient(circle at center top, rgb(31, 55, 87) 20%, rgb(19, 21, 55) 100%);\\n    height: 100%;\\n    color: white;\\n    font-family: 'Barlow Semi Condensed', sans-serif;\\n    margin: 0;\\n    padding: 0;\\n    text-align: center;\\n  }\\n\\n  :global(h1, h2, h3) {\\n    margin: 0;\\n    padding: 0;\\n  }\\n</style>\\n\\n{#if $session.gameRoom}\\n  <span>CURRENT ROOM: {$session.gameRoom}</span>\\n{/if}\\n{#if $showModal}\\n  <div transition:blur={{duration:90}}>\\n    <Modal>\\n      <GameRules />\\n    </Modal>\\n  </div>\\n{/if}\\n<Header></Header>\\n<Main>\\n  <Game/>\\n</Main>\\n<Rules/>\"],\"names\":[],\"mappings\":\"AAgBE,QAAQ,IAAI,0FAA0F,CAAC,CAAC,AAEhG,IAAI,AAAE,CAAC,AACb,MAAM,CAAE,IAAI,AACd,CAAC,AAEO,IAAI,AAAE,CAAC,AACb,gBAAgB,CAAE,gBAAgB,MAAM,CAAC,EAAE,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAClG,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,uBAAuB,CAAC,CAAC,UAAU,CAChD,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,MAAM,AACpB,CAAC,AAEO,UAAU,AAAE,CAAC,AACnB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC\"}"
};

const Game_1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $session;
	let $showModal = get_store_value(showModal);
	const { session } = stores$1();
	$session = get_store_value(session);
	$$result.css.add(css$c);
	$session = get_store_value(session);

	return `${$session.gameRoom
	? `<span>CURRENT ROOM: ${escape($session.gameRoom)}</span>`
	: ``}
${$showModal
	? `<div>${validate_component(Modal, "Modal").$$render($$result, {}, {}, {
			default: () => `${validate_component(GameRules, "GameRules").$$render($$result, {}, {}, {})}`
		})}</div>`
	: ``}
${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
${validate_component(Main, "Main").$$render($$result, {}, {}, {
		default: () => `${validate_component(Game, "Game").$$render($$result, {}, {}, {})}`
	})}
${validate_component(Rules, "Rules").$$render($$result, {}, {}, {})}`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog\.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?)\.json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		},

		{
			// api/player.js
			pattern: /^\/api\/player\/?$/,
			handlers: route_2,
			params: () => ({})
		},

		{
			// api/score.js
			pattern: /^\/api\/score\/?$/,
			handlers: route_3,
			params: () => ({})
		},

		{
			// api/room.js
			pattern: /^\/api\/room\/?$/,
			handlers: route_4,
			params: () => ({})
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: About }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Blog, preload: preload }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: U5Bslugu5D, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// game/index.svelte
			pattern: /^\/game\/?$/,
			parts: [
				{ name: "game", file: "game/index.svelte", component: Game_1 }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch$1(url, opts) {

	// allow custom promise
	if (!fetch$1.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch$1.Promise;

	// wrap http.request into fetch
	return new fetch$1.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch$1.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch$1(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch$1.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch$1.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		let session;
		try {
			session = await session_getter(req, res);
		} catch (err) {
			return bail(req, res, err);
		}

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				opts = Object.assign({}, opts);

				const include_credentials = (
					opts.credentials === 'include' ||
					opts.credentials !== 'omit' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
				);

				if (include_credentials) {
					opts.headers = Object.assign({}, opts.headers);

					const cookies = Object.assign(
						{},
						cookie.parse(req.headers.cookie || ''),
						cookie.parse(opts.headers.cookie || '')
					);

					const set_cookie = res.getHeader('Set-Cookie');
					(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
						const match = /([^=]+)=([^;]+)/.exec(str);
						if (match) cookies[match[1]] = match[2];
					});

					const str = Object.keys(cookies)
						.map(key => `${key}=${cookies[key]}`)
						.join('; ');

					opts.headers.cookie = str;

					if (!opts.headers.authorization && req.headers.authorization) {
						opts.headers.authorization = req.headers.authorization;
					}
				}

				return fetch$1(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && serialize_error(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
	if (!error) return null;
	let serialized = try_serialize(error);
	if (!serialized) {
		const { name, message, stack } = error ;
		serialized = try_serialize({ name, message, stack });
	}
	if (!serialized) {
		serialized = '{}';
	}
	return serialized;
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.join(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = new sessionFileStore(session);

const server = http.createServer();

polka({ server }) // You can also use Express
	.use(
		bodyParser.json(),
		session({
			secret: "SomeSecretStringThatIsNotInGithub",
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 31536000,
			},
			store: new FileStore({
				path: `.sessions`,
			}),
		}),
		compression({ threshold: 0 }),
		sirv("static", { dev }),
		middleware({
			session: (req, res) => {
				return {
					playerScore: req.session.playerScore || 0,
					playerName: req.session.playerName || undefined,
					gameRoom: req.session.gameRoom || undefined,
					opponentName: req.session.opponentName || undefined,
					opponentScore: req.session.opponentScore || 0,
					isHost: req.session.isHost || false
				}
			},
		})
	)
	.listen(PORT, (err) => {
		if (err) console.log("error", err);
	});

let numUsers = 0;
let rooms = new Map();

io$1(server).on('connection', function (socket) {
	++numUsers;
	let message = 'Server: A new user has joined the chat';
	socket.emit('user joined', { message, numUsers });
	socket.broadcast.emit('user joined', { message, numUsers });

	socket.on('message', function (msg) {
		socket.broadcast.emit('message', msg);
	});

	socket.on('createRoom', function ({room, playerName, message}) {
		socket.join(room);
		rooms.set(room, {
			name: room,
			playerOne: new Map([[playerName, 0]])
		});
		socket.broadcast.emit('message', message);
	});

	socket.on('joinRoom', function ({ room, playerName, message }) {
		socket.join(room);
		console.log("room to get", rooms.get(room));
		if (rooms.get(room)) {
			rooms.get(room).playerTwo = new Map([[playerName, 0]]);
			socket.emit("joined room", room);
			socket.broadcast.to(room).emit('opponent join', playerName);
		} else {
			socket.emit("no room", "there is no room");
		}
	});
	
	socket.on('host name', function ({ room, playerName}) {
		socket.to(room).emit('host name', playerName);
		socket.broadcast.to(room).emit('host name', playerName);
	});
	
	socket.on('roomMessage', function ({ room, message}) {
		socket.broadcast.to(room).emit('message', message);

	});

	socket.on('player choose', function ({ room, token }) {
		socket.broadcast.to(room).emit('player response', token);
	});

	socket.on('player score', function ({ room, score }) {
		socket.broadcast.to(room).emit('opponent score', score);
	});

	socket.on('disconnect', function () {
		--numUsers;
		socket.broadcast.emit('user left', numUsers);
	});

	socket.on('user disconnect', function (name) {
		socket.broadcast.emit('message', `Server: ${name} has left the chat.`);
	});
});
