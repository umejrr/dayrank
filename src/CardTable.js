
import { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const initialDays = [
  { id: 1, date: '20/11/2025', tier: 'Gold', score: 3 }
];

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
    <div class="card-table-wrap">
        
        <a className="add-btn" onClick={()=> setModalOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7H13" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M7 1L7 13" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </a>

        <div className="card-table-wrapper">


                <ul className='card-table'>
                    {days.map(day => (
                        <li className='card' key={day.id} style={{backgroundColor : day.bgColor}}>
                            <p>{new Date(day.date).toLocaleDateString("en-GB")}</p>
                            <p>{day.tier}</p>
                            <p>{day.score}</p>
                        </li>
                    ))}
                </ul>
            

        </div>

        <dialog open={modalOpen}>
            <div class="dialog-wrap">
                <h2>Add new card</h2>
                <form onSubmit={handleSubmit}>
                    <div class="fields-wrap">
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
  )
}

export default CardTable;