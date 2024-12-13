import { Component } from "react";
import { v4 as uuid } from 'uuid';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

class TaskComponent extends Component {
  state = {
    title: '',
    description: '',
    date: '',
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangeDate = e => {
    this.setState({ date: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { title, description, date } = this.state;
    const { addTasks } = this.props;

    if (title === '' || description === '' || date === '') {
      alert('Please fill out all fields');
    } else {
      const task = {
        id: uuid(),
        title,
        description,
        date,
        status: 'START', // default status
      };
      this.setState({ title: '', description: '', date: '' });
      addTasks(task);
    }
  };

  render() {
    const { title, description, date } = this.state;
    const { tasks } = this.props;

    // Ensure all statuses are accounted for in case there are no tasks for a status
    const statusCount = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, { START: 0, 'IN PROGRESS': 0, COMPLETED: 0 });

    const data = Object.keys(statusCount).map(status => ({
      name: status,
      value: statusCount[status],
    }));

    const colors = ['#8884d8', '#82ca9d', '#ffc658'];

    return (
      <div className="form-container">
        <h3>Task Details</h3>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="title">Task Title:</label>
          <input id="title" type="text" placeholder="Enter title" value={title} onChange={this.onChangeTitle} />

          <label htmlFor="description">Description: </label>
          <textarea id="description" rows="4" value={description} onChange={this.onChangeDescription} />

          <label htmlFor="date">Due Date:</label>
          <input id="date" type="date" value={date} onChange={this.onChangeDate} />

          <button type="submit" className="submit-btn">Add Task</button>
        </form>

        {/* Display pie chart */}
        <div>
          {/* Task Status Legend */}
          <div>
            {['START', 'IN PROGRESS', 'COMPLETED'].map((status, index) => (
              <div key={status}>
                <div style={{ background: colors[index], width: '20px', height: '20px' }}></div>
                <p>{status}</p>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default TaskComponent;
