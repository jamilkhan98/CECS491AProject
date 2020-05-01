/*
 * A simple React component
 */import React, {Component} from 'react';
 class StarRatingComponent extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
            stars: [],
            rating: props.rating,
            hovered: 0,
            selectedIcon: "★",
            deselectedIcon: "☆",
            editing: props.editing
  
        };
        let outOf = props.outOf ? props.outOf : 5;
  
        for (var i = 0; i < outOf; i++) {
            this.state.stars.push(i + 1);
        }
    }
  
    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
  
        if (this.props.onChange)
            this.props.onChange(newRating);
    }
  
    hoverRating(rating) {
      this.setState({
            hovered: rating
        });
      
    }
  
    render() {
  
        const { stars, rating, hovered, deselectedIcon, selectedIcon, editing } = this.state;
        if (editing == true){
        return (
            <div>
                <div className="rating" style={
                  { fontSize: '20px', color: "#ffb400" }
                  }>
  
                    {stars.map(star => {
                        return (
                            <span
                                style={{ cursor: 'pointer'}}
                                onClick={() => { this.changeRating(star); }}
                                onMouseEnter={() => { this.hoverRating(star); }}
                                onMouseLeave={() => { this.hoverRating(0); }}
                            >
                                {rating < star ?
                                    hovered < star ? deselectedIcon : selectedIcon
                                    :
                                    selectedIcon
                                }
                            </span>
                        );
                    })}
                  <p>{rating} / 5 stars</p>
                </div>
            </div>
        );
        }
        else{
        return (
          <div>
            <div className="rating" style={
              { fontSize: '20px', color: "#ffb400" }
              }>
  
                {stars.map(star => {
                    return (
                        <span
                            style={{ cursor: 'default'}}
                        >
                            {rating < star ?
                                hovered < star ? deselectedIcon : selectedIcon
                                :
                                selectedIcon
                            }
                        </span>
                      );
                    })}
                {/* <p>{rating}</p> */}
              </div>
          </div>
        )
        }
      }
  }
  
  
  export default StarRatingComponent;