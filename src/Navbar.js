const Navbar = ({ categories, handleSubmit, categoryEl, amountEl, timeEl }) => {
    return (
        <form id="myform" onSubmit={handleSubmit} className="navbar">
                <select id="category" className="form-select" aria-label="Default select example" ref={categoryEl} required>
                    <option>Choose the Category</option>
                    {categories.map(category => {
                        return <option value={category.id} key={category.id}>{category.name}</option>
                    })}
                </select>
                <input type="number" className="form-control" placeholder="Enter No. of Questions" id="amount" ref={amountEl} required />
            
                <select id="time" className="form-select" aria-label="Default select example" ref={timeEl} required>
                    {/* <option>Select Time</option> */}
                    <option value="10" selected>10 Seconds</option>
                    <option value="15">15 Seconds</option>
                    <option value="30">30 Seconds</option>
                    <option value="60">1 Minute</option>
                    <option value="120">2 Minutes</option>
                    <option value="300">5 Minutes</option>
                    <option value="600">10 Minutes</option>
                </select>
            <button type="submit" className="submit btn">Start Quiz</button>
        </form>

    );
}

export default Navbar;
