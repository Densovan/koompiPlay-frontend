import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import IosRibbonOutline from 'react-ionicons/lib/IosRibbonOutline';
// import { Link } from "react-router-dom";
//
import swal from 'sweetalert';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import ParticlesBg from 'particles-bg';
import buttonSound from '../../../assets/sound/button-sound.mp3';

const TITLE = 'Result | Quiz app';

var accessTokenObj = localStorage.getItem('token');
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: '',
      wrongAnswers: 0,
      hintsUsed: 0,
      //submit win game
      subAccoutId: '7b2f0b6e-030e-442a-b163-9821779551b9',
      amount: '',
      memo: 'game coin send',
      select: 'SET',
      apikey: 'c9c3cce7-61c1-43e8-97f7-495d75c51b18',
      apisec:
        'ZTc3NGQ2NTEtMTYzMy00YjVjLWI4ZmQtNmQwNDI5NmUxYzRlQmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmZhV1FpT2lKak9XTXpZMk5sTnkwMk1XTXhMVFF6WlRndE9UZG1OeTAwT1RWa056VmpOVEZpTVRnaUxDSmxlSEFpT2pFMU9UYzRNakkxTVRkOS5iazdoXzJzQ1JlZlFfZ1EtNW9LRWNBMjFoWFd5U3JkUlVGdDJJQ1c4dmU4',
      //submit lost game
      lostAccId: '',
      lostAmount: '',
      subAcc: 'GA5TLEFV22D4YBALJR4D5DKXFKVWNXVYJ3CVKIFHDL2GSF7YF2FREZNZ',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonSound = React.createRef();
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://backend.rielcoin.com/get-wallet',
      headers: {
        token: accessTokenObj,
      },
    }).then((res) => {
      this.setState(res.data);
      console.log(res.data);
    });
    const { state } = this.props.location;
    if (state) {
      this.setState({
        score: (state.score / state.numberOfQuestions) * 100,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hintsUsed: state.hintsUsed,
      });
    }
  }

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  handleChange = (e) => {
    console.log('hello');
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    if (
      this.state.correctAnswers === 5 ||
      this.state.correctAnswers === 4 ||
      this.state.correctAnswers === 3
    ) {
      e.preventDefault();
      // console.log('hello world');
      var accessTokenObj = localStorage.getItem('token');
      // console.log(accessTokenObj);
      const newResult = {
        score: this.state.score,
      };
      console.log(newResult);
      fetch('https://backend.rielcoin.com/play_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: accessTokenObj,
        },
        body: JSON.stringify({
          score: this.state.correctAnswers,
          result_category: 'calculating',
        }),
      });

      axios({
        method: 'POST',
        url: 'https://testnet-api.selendra.com/apis/v1/payment',
        data: {
          id: this.state.subAccoutId,
          apikey: this.state.apikey,
          apisec: this.state.apisec,
          destination: this.state.wallet,
          // amount: this.state.correctAnswers.toString(),
          amount: this.state.amount.toString(),
          asset_code: this.state.select,
          memo: this.state.memo,
        },
      }).then((res) => {
        console.log(res.data.message);
      });
      const newsend = {
        id: this.state.subAccoutId,
        apikey: this.state.apikey,
        apisec: this.state.apisec,
        destination: this.state.wallet,
        amount: this.state.amount,
        asset_code: this.state.select,
        memo: this.state.memo,
      };
      console.log('result wallet', newsend);
    } else if (this.state.correctAnswers <= 2) {
      e.preventDefault();
      console.log('hello world');
      var accessTokenObj = localStorage.getItem('token');
      // console.log(accessTokenObj);
      const newResult = {
        score: this.state.score,
      };
      console.log(newResult);
      fetch('https://backend.rielcoin.com/play_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: accessTokenObj,
        },
        body: JSON.stringify({
          score: this.state.correctAnswers,
          result_category: 'calculating',
        }),
      });

      axios({
        method: 'POST',
        url: 'https://pro-api.zeetomic.com/apis/v1/payment',
        data: {
          id: this.state.wallet_id,
          apikey: this.state.apikey,
          apisec: this.state.apisec,
          destination: this.state.subAcc,
          // amount: this.state.correctAnswers.toString(),
          amount: this.state.lostAmount.toString(),
          asset_code: this.state.select,
          memo: this.state.memo,
        },
      }).then((res) => {
        console.log(res.data.message);
        console.log('wallet IDD', this.state.wallet_id);
      });
      const newsend = {
        id: this.state.wallet_id,
        apikey: this.state.apikey,
        apisec: this.state.apisec,
        destination: this.state.subAcc,
        amount: this.state.correctAnswers,
        asset_code: this.state.select,
        memo: this.state.memo,
      };
      console.log('lost wallet', newsend);
    }
  };

  render() {
    const submitAlert = () => {
      this.playButtonSound();
      swal({
        title: 'Thank you so much!',
        icon: 'success',
        button: 'Ok',
        timer: 3000,
        closeOnClickOutside: false,
      }).then(() => {
        this.props.history.push('/');
      });
    };

    const { state } = this.props.location;
    let stats, remark;
    const userScore = this.state.score;
    const answer = this.state.correctAnswers;

    if (userScore <= 30) {
      remark = 'You need more practice !';
    } else if (userScore > 30 && userScore <= 50) {
      remark = 'Better luck for the next time !';
    } else if (userScore > 50 && userScore <= 70) {
      remark = "Wow it's better !";
    } else if (userScore >= 71 && userScore <= 84) {
      remark = 'You did it greate!';
    } else {
      remark = "You're an absolute genuis!";
    }

    if (answer === 5) {
      this.state.amount = 5;
    } else if (answer === 4) {
      this.state.amount = 3;
    } else if (answer === 3) {
      this.state.amount = 1;
    } else if (answer === 2) {
      this.state.lostAmount = 1;
    } else if (answer === 1) {
      this.state.lostAmount = 3;
    } else if (answer === 0) {
      this.state.lostAmount = 5;
    }

    if (state !== undefined) {
      stats = (
        <React.Fragment>
          <div className="m-auto flex justify-center p-0 mt-4">
            <span className="icon text-indigo-800 text-6xl">
              <IosRibbonOutline shake={true} fontSize="80px" color="orange" />
            </span>
          </div>
          <h2
            id="result-header"
            className=" text-indigo-800 text-4xl text-center"
          >
            Congratulations
          </h2>
          <form
            id="form-background"
            onSubmit={this.handleSubmit}
            className="container shadow-xl rounded mx-auto h-auto w-auto overflow-hidden"
          >
            <div className="h-0">
              <svg
                id="wave"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  fill="#00cba9"
                  fill-opacity="1"
                  d="M0,256L21.8,229.3C43.6,203,87,149,131,160C174.5,171,218,245,262,250.7C305.5,256,349,192,393,181.3C436.4,171,480,213,524,213.3C567.3,213,611,171,655,138.7C698.2,107,742,85,785,90.7C829.1,96,873,128,916,122.7C960,117,1004,75,1047,58.7C1090.9,43,1135,53,1178,74.7C1221.8,96,1265,128,1309,170.7C1352.7,213,1396,267,1418,293.3L1440,320L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
                ></path>
              </svg>
            </div>
            <div className="container text-center">
              <h3 className=" container text-3xl text-gray-100 font-bold">
                {remark}
              </h3>
              <Progress
                type="circle"
                percent={this.state.score.toFixed(0)}
                strokeWidth={8}
                theme={{
                  error: {
                    symbol: this.state.score.toFixed(0) + '%',
                    trailColor: 'pink',
                    color: 'red',
                  },
                  active: {
                    symbol: this.state.score.toFixed(0) + '%',
                    trailColor: '	#E0FFFF',
                    color: '#0F1EF0',
                  },
                }}
              />
            </div>
            <div className="container p-4 text-black text-xl font-bold px-16">
              <span onChange={this.handleChange}>
                Total of the number questions: {this.state.numberOfQuestions}
              </span>

              <Progress width={70} percent={100} status="active" />

              <br />
              <br />
              <span onChange={this.handleChange}>
                Number of attempted questions:{' '}
                {this.state.numberOfAnsweredQuestions}
              </span>
              <Progress percent={100} status="active" />
              <br />
              <br />
              <span onChange={this.handleChange}>
                Number of correctAnswers: {this.state.correctAnswers}
              </span>
              <Progress
                percent={this.state.correctAnswers * 20}
                status="active"
              />
              <br />
              <br />
              <span onChange={this.handleChange}>
                Number of incorrectAnswers: {this.state.wrongAnswers}
              </span>
              <Progress
                percent={this.state.wrongAnswers * 20}
                status="active"
              />
              <br />
              <br />
              <span onChange={this.handleChange}>
                Hints used: {this.state.hintsUsed}
              </span>
              <Progress percent={this.state.hintsUsed * 50} status="success" />
            </div>
            <div className="px-12 py-6">
              <input
                onClick={submitAlert}
                className="w-48 mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer"
                type="submit"
                value="Get Win"
              />
              {/* <Link to="/profile">
              <input
                // onClick={submitAlert}
                className="w-32 mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer"
                type="submit"
                value="Home"
              />
            </Link> */}
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      stats = (
        <form className="container text-center text-6xl shadow-xl rounded px-8 pt-4 pb-8 mx-auto my-auto h-full">
          <h1>No stats available please take a quiz!</h1>
        </form>
      );
    }

    return (
      <React.Fragment>
        <audio ref={this.buttonSound} src={buttonSound}></audio>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <ParticlesBg type="custom" bg={true} />
        {stats}
      </React.Fragment>
    );
  }
}

export default Result;
