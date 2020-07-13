import React, { Component } from 'react';
import "./HomePage.css";

class HomePage extends Component {
    render() {
        return (
            <div className="HomePage">
                <div className='HomePage1'><h4>?הידעת </h4><h3> :מחקרים מוכיחים <br/>מתנדבים הם אנשים <br/>מאושרים יותר </h3></div>
                <div className='HomePage2'>
                    <h2>?למה כדאי להתנדב</h2>
                    <h3>:מחקרים מוכיחים שמתנדבים</h3>
                    <p>.מרוצים יותר מחייהם(!)</p>
                    <p>.חשים אופטימיים ומלאי מרץ(!)</p>
                    <p>.בעלי תוחלת חיים ארוכה יותר(!)</p>
                    <p>.בעלי קשרים חברתיים נרחבים(!)</p>
                    <p>.מתמודדים היטב עם בעיות(!)</p>
                </div>
        
            </div>
        );
    }
}

export default HomePage;