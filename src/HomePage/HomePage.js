import React from 'react';


function HomePage() {
  return (
    <div className="homepage">
        <form>
            <h2>Input An Expense</h2>
            <label>
                Name:
                <input type="text" name="name" placeholder="Groceries"/>
            </label>
            <label>
                Amount:
                <input type="text" name="amount" placeholder="100.00"/>
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>

  );
}

export default HomePage;