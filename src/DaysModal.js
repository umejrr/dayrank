import DatePicker from "react-datepicker";

const DaysModal = ({
  dayOpen,
  handleSubmit,
  morningValue,
  handleChangeMorning,
  nightValue,
  handleChangeNight,
  startDate,
  setStartDate,
}) => {
  return (
    <dialog open={dayOpen}>
      <div className="dialog-wrap">
        <h2>Add new card</h2>
        <div class="form-wrap">
          <form className="day-form" onSubmit={handleSubmit}>
            <div className="fields-wrap">
              <div className="input-wrap date">
                <label>Date:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                ></DatePicker>
              </div>
              <div className="input-wrap morning">
                <label>Morning:</label>
                <select value={morningValue} onChange={handleChangeMorning}>
                  <option className="default-option" value={""}>
                    Pick one
                  </option>
                  <option className="bronze-option">Bronze</option>
                  <option className="silver-option">Silver</option>
                  <option className="gold-option">Gold</option>
                </select>
              </div>
              <div className="input-wrap night">
                <label>Night:</label>
                <select value={nightValue} onChange={handleChangeNight}>
                  <option className="default-option" value={""}>
                    Pick one
                  </option>
                  <option className="bronze-option">Bronze</option>
                  <option className="silver-option">Silver</option>
                  <option className="gold-option">Gold</option>
                </select>
              </div>
            </div>
            <input
              className="submit-btn"
              type="submit"
              disabled={!morningValue || !nightValue}
              value={"Add"}
            ></input>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DaysModal;
