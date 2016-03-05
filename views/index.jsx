var React = require('react');

var ContentBox = React.createClass({
   render: function() {
     return (
       <div className="contentBox">
         <h1>FightClub App</h1>
         <FightBox  data = {this.props.data} />
         <ShowFightersBox  data = {this.props.data} />
       </div>
     );
   }
 });

var FightBox = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    };
  },
  render: function(){
    return (
      <div className="FightBox">
        <h2>Create a Fight</h2>
        <FightConsole data = {this.props.data} />
      </div>
    );
  }
});

var FightConsole = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
      f1: 2,
      f2: 1,
      text: ''
    };
  },
  changeFighter1: function(e) {
  this.setState({f1: e.target.value});
  },
  changeFighter2: function(e) {
  this.setState({f2: e.target.value});
  },
  startFight: function(){
    var fighter1 = -1;
    var fighter2 = -1;
    var output = "";
    var winner = -1;
    var newExp = 0;
    var newData = this.state.data;
    if(this.state.f1==this.state.f2) output = "You cannot choose the same fighters."; 
    else {
      for(var i=0;i<this.props.data.length;i++){
        if(this.props.data[i].id==this.state.f1) fighter1 = i ;
        else  
          if(this.props.data[i].id==this.state.f2) fighter2 = i;
      }
    output += "Fight between "+ this.props.data[fighter1].firstName + " and " + this.props.data[fighter2].firstName +'! \n';
    if(this.props.data[fighter1].exp == this.props.data[fighter2].exp) output += "We have a draw, nobody is a winner.";
      else if(this.props.data[fighter1].exp < this.props.data[fighter2].exp) { winner = fighter2; newExp = this.props.data[fighter1].exp/10;}
        else {winner = fighter1; newExp = this.props.data[fighter2].exp/10;}
    if(winner>-1) 
      {
        output += "The winner of the battle is "+ this.props.data[winner].firstName + " - congratulations! Winner earns + "+newExp+" points.";
        newData[winner].exp = newData[winner].exp*1 + newExp;
        this.setState({data: newData});
      }
    }
    this.setState({text: output});
  },
  render: function(){
    var fighters = this.state.data.map(function(obj) { return <Fighters title={obj.id} key={obj.id}>{obj}</Fighters>});
    return(
      <div className = 'FightConsole'>
        <select name="fighter1" value={this.state.f1} onChange={this.changeFighter1} id="f1">
          {fighters}
        </select>
        <select name="fighter2" value={this.state.f2} onChange={this.changeFighter2} id="f2">
          {fighters}
        </select>
        <button onClick={this.startFight}>Fight!</button>
        <p>{this.state.text}</p>

      </div>
    );
  }
});

var Fighters = React.createClass({
    render: function() {
      return (
          <option value={this.props.children.id}>{this.props.children.firstName}</option>
      );
    }
  });

 var ShowFightersBox = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    };
  },
   render: function() {
     return (
       <div className="showFightersBox">
         <h2>Fighters</h2>
         <ShowFightersList data = {this.props.data} />
       </div>
     );
   }
 });

 var ShowFightersList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
      firstName: '',
      lastName: '',
      exp: '',
      avatar: ''
    };
  },
  changeFirstName: function(e) {
    this.setState({firstName: e.target.value});
  },
  changeExp: function(e) {
    this.setState({exp: e.target.value});
  },
  changeLastName: function(e) {
    this.setState({lastName: e.target.value});
  },
  changeAvatar: function(e) {
    this.setState({avatar: e.target.value});
  },
  addToDo: function() {
    var newData = this.state.data;

    newData.push({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          exp: this.state.exp,
          avatar: this.state.avatar,
          id: this.state.data.length
        });
    this.setState({data: newData});
    this.setState({firstName: ""});
    this.setState({lastName: ""});
    this.setState({exp: ""});
    this.setState({avatar: ""});
  },
   render: function() {
     var showFighters = this.state.data.map(function(obj) { return <ShowFighters title={obj.firstName} key={obj.id}>{obj}</ShowFighters>});
     return (
       <div className = "showFightersList">       
         <table style={{border: "2px solid black"}}>
          <thead>
             <tr>
              <th></th>
              <th>Name</th>
              <th>Exp</th>
             </tr>
           </thead>
           <tbody>
             {showFighters}
           </tbody>
         </table>
         <div>
          <h2>Add a fighter</h2>
          <p><input placeholder="First name" type="text" value={this.state.firstName} onChange={this.changeFirstName} /></p>
          <p><input placeholder="Last name" type="text" value={this.state.lastName} onChange={this.changeLastName} /></p>
          <p><input placeholder="Experience" type="number" value={this.state.exp} onChange={this.changeExp} /></p>
          <p><input placeholder="Link to avatar" type="text" value={this.state.avatar} onChange={this.changeAvatar} /></p>
          <button onClick={this.addToDo}>Add</button>
       </div>
       </div>
     );
   }
 });

 var ShowFighters = React.createClass({
    render: function() {
      return (
        <tr>
          <td><img src={this.props.children.avatar} alt="Avatar" height="40" width="40"/></td>
          <td style={style.tableContent}>{this.props.children.firstName} {this.props.children.lastName}</td>
          <td style={style.tableContent}>{this.props.children.exp}</td>
        </tr>
      );
    }
  });

 var style = {   
   tableContent: {
     border: "1px solid black"
   }
 };

 module.exports = ContentBox;