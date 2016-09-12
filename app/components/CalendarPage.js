import React from 'react';
import Calendar from './Calendar';

class CalendarPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="col s12 m6">
            <Calendar />
        </div>
      </div>
    )
  }
}

export default CalendarPage;
