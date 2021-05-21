import PaperImage from '../../public/images/icon-paper.svg';
import RockImage from '../../public/images/icon-rock.svg';
import ScissorsImage from '../../public/images/icon-scissors.svg';

const tokens  = [
  {
    imgSource: PaperImage,
    name: "paper",
    winTo: "rock",
  },
  {
    imgSource: ScissorsImage,
    name: "scissors",
    winTo: "paper",
  },
  {
    imgSource: RockImage,
    name: "rock",
    winTo: "scissors",
  }
]

export default tokens;