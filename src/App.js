import './App.scss';
import { useState } from 'react';
import head from './imgs/Frame 23.png'
import mouthBorder from './imgs/Vector 7.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const initialDays = [
  { id: 1, date: '20/11/2025', tier: 'Gold', score: 3 }
];


function App() {

  return (
    <div className="App">
      <CardTable></CardTable>
    </div>
  );
}

function CardTable() {
    const [modalOpen, setModalOpen] = useState(false);
    const [days, setDays] = useState(initialDays)
    const [newDays, setNewDays] = useState({date:'', morning: 0, night: 0, tier:'', score: 0})
    const [startDate, setStartDate] = useState(new Date());

    const [morningValue, setMorningValue] = useState('')
    const [nightValue, setNightValue] = useState('')

    function handleChangeMorning(e){
        setMorningValue(e.target.value)        
        var scoreMornin = 0;
        switch (e.target.value) {
            case "Gold" : 
                scoreMornin = 3
                break;
            case "Silver":
                scoreMornin = 2
                break;
            case "Bronze":
                scoreMornin = 1
                break;
        }
        
        setNewDays(prev=> ({...prev, morning: scoreMornin}))
    }

    function handleChangeNight(e){
        setNightValue(e.target.value)
        var scoreNight = 0;

        switch (e.target.value) {
            case "Gold" : 
                scoreNight = 3
                break;
            case "Silver":
                scoreNight = 2
                break;
            case "Bronze":
                scoreNight = 1
                break;
        }
        
        setNewDays(prev=> ({...prev, night: scoreNight}))
    }

    function handleSubmit(e){
        e.preventDefault();

        let score = (newDays.morning + newDays.night) / 2
        let tier = '';
        let bgColor = '';
        if (score === 3) {
            tier = "Gold"; 
            bgColor = "yellow"
        }
        else if(score < 3 && score >= 2){ 
            tier = "Silver"
            bgColor = "gray"
        }
        else {
            tier = "Bronze"
            bgColor = "brown"
        }

        setDays(prevDays => [...prevDays, {...newDays, id: prevDays.length + 1, score, tier, bgColor: bgColor, date: startDate}]) 
        setNewDays({ date:'', morning: 0, night: 0, tier:'', score: 0 });
        setMorningValue('')
        setNightValue('')
        setModalOpen(false);
    }
        

  return (

    <header className="App-header">
        <div className="padding-global">
        <div className="container">

        <div className="topbar">
            <div className="topbar-heading-wrap">
              <h1>LAST 10 DAYz</h1>
            </div>
            <div className="topbar-btns-wrap">
              <a href="#" className="checklist">
                <svg width="112" height="114" viewBox="0 0 112 114" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.89844 108.016C5.89844 106.827 6.19459 104.435 6.86766 102.638C7.6107 100.654 8.88688 99.0509 10.0064 97.3278C11.3365 95.2808 13.9663 93.9624 15.7634 92.466C17.3078 91.18 19.6471 90.6689 21.9692 90.0698C24.3963 89.4437 27.4278 89.3227 33.3957 89.3182C36.5375 89.3159 38.1969 90.8125 39.994 91.858C41.7931 92.9046 43.5815 93.8009 45.3786 94.999C47.1757 96.197 49.2623 97.0945 51.5844 98.4384C53.3831 99.4794 55.2481 100.532 57.1193 102.102C59.1466 103.804 61.5301 104.274 63.3272 105.245C65.4762 106.407 69.1493 107.119 71.7765 107.565C76.2732 108.329 83.5172 107.424 85.3143 106.672C87.1098 105.921 88.9017 104.732 90.3264 103.161C91.8992 101.739 92.7966 99.9483 93.3216 97.781C93.3979 96.9599 93.3979 95.7752 93.3979 94.5547" stroke="black" stroke-width="10" stroke-linecap="round"/><path d="M5 105.773C5.14808 104.88 6.04102 103.089 7.16505 101.218C8.48263 99.0248 8.73331 96.0624 9.48491 94.0387C10.2845 91.8857 11.1294 90.0766 12.1009 87.9071C12.9929 85.9149 14.1179 83.7946 14.5711 81.625C15.091 79.1362 17.1063 75.4305 18.3829 72.5767C19.3995 70.3042 19.9512 68.0895 20.7028 65.846C21.4418 63.64 21.8986 61.8075 22.4236 60.0104C22.9727 58.1309 23.2448 55.6781 23.4714 53.6544C23.7199 51.4345 24.2947 49.0999 24.7412 46.6253C25.0833 44.729 25.4883 42.6654 25.7149 38.4071C25.8717 35.4617 26.3858 33.0898 26.6124 29.8029C26.7592 27.6726 27.2832 25.9103 27.5098 18.8992C27.5838 17.3803 27.7319 16.936 27.8082 16.4851C27.8845 16.0341 27.8845 15.5899 27.8845 15.1322" stroke="black" stroke-width="10" stroke-linecap="round"/><path d="M91.6022 97.2471C91.6022 95.7619 91.8984 92.7689 92.4234 90.7497C93.1644 87.8997 93.3971 86.0382 94.142 83.8687C94.7675 82.0467 95.192 79.6126 96.3093 76.3931C97.0805 74.1706 97.283 71.3832 97.5096 69.0611C97.8946 65.1156 98.1804 58.8192 98.407 53.4435C98.5346 50.4166 99.0778 48.3461 99.3044 45.6561C99.5474 42.7716 100.128 40.718 100.5 38.5485C100.848 36.5226 101.474 33.5475 101.92 31.2927C102.478 28.4781 102.964 23.9719 103.417 19.6351C103.738 16.5643 104.759 13.3464 105.212 9.31467C105.483 6.90303 106.558 5.71373 106.708 5.26277C107.172 3.87253 104.92 8.39256 103.648 10.1156C102.376 11.8383 100.137 12.5836 98.3397 13.7076C96.712 14.7256 94.7522 14.6835 92.9551 15.13C90.9798 15.6208 88.9189 16.3258 86.7494 16.5524C80.7509 17.179 70.5216 16.3348 68.7245 15.2108C66.9925 14.1275 65.137 12.7451 63.3399 12.2919C61.3239 11.7835 59.7524 10.0528 57.9553 8.55634C56.4584 7.30985 52.591 6.3195 47.6439 5.6352C42.4634 4.91864 34.6244 5.85283 32.8273 7.12494C30.882 8.50197 29.3924 10.6361 27.8892 12.4332C27.5886 12.8842 27.2924 13.3284 27.0658 13.7794C26.8392 14.2303 26.6911 14.6746 26.0898 16.0297" stroke="black" stroke-width="10" stroke-linecap="round"/><path d="M42.2656 31.9879C42.2656 31.8132 42.2656 31.6384 42.5277 31.4611C44.9686 29.8091 49.6678 30.5795 53.5462 30.4868C56.1017 30.4258 58.1395 31.8079 60.7869 32.6895C63.8103 33.6963 65.5522 35.8637 68.1123 37.1901C70.3229 37.9869 72.7849 38.6911 75.6971 39.7501C76.8408 39.9301 78.5881 39.9301 80.3883 39.9301" stroke="black" stroke-width="10" stroke-linecap="round"/><path d="M43.8535 52.6376C44.3777 51.9334 46.4903 51.2292 52.5661 51.2239C55.7459 51.2211 57.6094 53.5165 59.73 54.2234C61.9087 54.9496 64.3127 56.1639 66.6133 56.8708C68.7339 57.5777 71.1959 58.2819 74.4628 58.1124C75.2624 57.763 75.9613 57.0641 77.2109 55.8145" stroke="black" stroke-width="10" stroke-linecap="round"/><path d="M38.0293 73.817C38.0293 73.4675 38.0293 73.118 38.2914 72.7633C40.2242 70.1472 45.9609 72.0485 48.0815 73.1948C50.1334 74.304 52.3147 75.2254 54.8748 76.0196C57.6095 76.9938 60.7864 77.3433 70.378 77.436C72.4403 77.3486 72.9645 77.1739 74.5635 76.4644" stroke="black" stroke-width="10" stroke-linecap="round"/></svg>
              </a>
              <a onClick={()=> setModalOpen(true)} className="new-day">
                <svg width="102" height="100" viewBox="0 0 102 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="51.5" cy="50.5001" r="44.5" fill="white"/><path d="M50 23.0001C50 23.3565 50 23.7129 50 29.8662C50 36.0195 50 47.9589 50 54.3768C50 62.4266 50 64.5693 50 72.5586C50 74.2947 50 74.8293 50 75.372C50 75.9147 50 76.4493 50 77.0001" stroke="black" stroke-width="10" stroke-linecap="round"/><path d="M24 49.0001C26.5457 49.0001 32.7667 49.0001 40.751 49.0826C44.9254 49.1258 53.8598 49.5001 66.4341 49.5826C71.1894 49.6651 72.6441 49.8301 74.0299 49.9151C75.4157 50.0001 76.6886 50.0001 78 50.0001" stroke="black" stroke-width="10" stroke-linecap="round"/><path d="M72.4302 90.0526C69.4248 91.3709 66.4194 92.4967 63.8716 93.3511C62.5346 93.7994 61.1374 93.8206 56.4683 94.3864C44.7985 95.8005 35.5349 94.3921 33.0916 93.9225C29.1923 93.1731 23.3269 90.0753 19.2425 87.3256C16.5299 85.4995 12.7628 80.6609 7.48074 69.7274C2.74565 59.9261 6.14186 49.1476 6.70679 44.9977C7.49715 39.1917 9.90427 36.5084 11.1302 33.3005C12.7441 29.0771 15.5422 25.5777 17.6268 22.2651C19.3751 19.4869 22.3326 16.7065 25.7109 14.251C32.2325 9.51092 35.1338 8.77441 38.707 7.92576C43.6695 6.74712 48.8615 5.75321 55.0701 5.28363C70.1245 4.14497 72.7918 6.69239 75.7153 8.38686C78.3406 9.9085 81.4577 11.9653 85.0337 14.7008C88.9179 17.6721 92.5642 24.9667 94.2703 29.0289C96.0731 33.3215 96.3379 40.7856 96.8152 44.8761C97.3949 49.8434 96.5413 58.1546 95.2193 62.1292C94.4233 64.5224 93.8974 66.8448 91.8354 72.0216C90.3632 75.7178 88.4402 78.1602 86.6551 80.0499C84.5684 82.2586 82.983 84.3836 80.9126 86.0866C78.8112 87.815 76.0232 88.7287 73.0997 89.8603C71.8766 90.0526 70.7411 90.426 69.6141 91.0852C69.0463 91.3709 68.4871 91.5576 66.781 92.3157" stroke="black" stroke-width="10" stroke-linecap="round"/></svg>
              </a>
            </div>
            </div>
            </div>
          </div>
          <div className="card-table-wrap">
      <div className="padding-global">
        <div className="container">
          <img className='head' src={head} alt=""/>
            <div className="mouth">
              <ul className='card-table'>
                <img className='mouth-border' src={mouthBorder} alt="" />
                    {days.map(day => (
                        <li className='card' key={day.id} style={{backgroundColor : day.bgColor}}>
                            <p>{new Date(day.date).toLocaleDateString("en-GB")}</p>
                            <p>{day.tier}</p>
                            <p>{day.score}</p>
                        </li>
                    ))}
                </ul>
                
            </div>
            
          </div>
        </div>

        
        <a className="add-btn" onClick={()=> setModalOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7H13" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M7 1L7 13" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </a>

        <div className="card-table-wrapper">


                
            

        </div>

        
          <dialog open={modalOpen}>
              <div className="dialog-wrap">
                  <h2>Add new card</h2>
                  <form onSubmit={handleSubmit}>
                      <div className="fields-wrap">
                          <div>
                              <label>Date:</label>
                              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}></DatePicker>
                          </div>
                          <div>
                              <label>Morning:</label>
                              <select value={morningValue} onChange={handleChangeMorning}>
                                 <option value={''}>Pick one</option>
                                 <option>Bronze</option>
                                 <option>Silver</option>
                                 <option>Gold</option>
                              </select>
                          </div>
                          <div>
                              <label>Night:</label>
                              <select value={nightValue} onChange={handleChangeNight}>
                                 <option value={''}>Pick one</option>
                                 <option>Bronze</option>
                                 <option>Silver</option>
                                 <option>Gold</option>
                              </select>
                          </div>
                      </div>
                      <input type='submit' disabled={!morningValue || !nightValue}  value={'Add'}></input>
                  </form>
                  <a onClick={()=> setModalOpen(false)} className='dialog-close'><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.00024C1.11851 1.35758 1.71467 2.19256 2.6125 3.15144C3.68599 4.29793 5.36345 5.3637 6.35376 6.02629C7.3278 6.67801 8.35861 7.70164 9.8526 9.10495C10.2153 9.43804 10.4523 9.61582 10.7226 9.85554C10.9928 10.0953 11.2891 10.3915 11.774 10.8764" stroke="black" stroke-width="2" stroke-linecap="round"/>
                  <path d="M10.5156 1.00024C10.3971 1.35758 9.91949 2.07405 9.29101 2.79321C8.71087 3.45706 8.06637 4.22884 7.13711 5.1563C5.75394 6.5368 4.35295 8.35885 3.8735 9.07802C3.33481 9.73792 2.79611 10.0971 2.43788 10.3655C2.25741 10.5154 2.07964 10.6932 1.89648 11.0559" stroke="black" stroke-width="2" stroke-linecap="round"/>
                  </svg>
              </a>
              </div>
          
          </dialog>
        
    </div>
    </header>
    
  )
}

export default App;