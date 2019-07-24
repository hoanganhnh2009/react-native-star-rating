import React, { PureComponent, Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

const emptyStar = <Icon name="star-o" size={30} color="gold" />;
const fullStar = <Icon name="star" size={30} color="gold" />;

const defaultProps = {
  bgIcon: ""
};
const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
  data: PropTypes.array,
  value: PropTypes.number
};

class StarRating extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}, {}, {}, {}, {}],
      data10: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      value: 0
    };
  }
  /*  componentDidMount(){
    this.setState({value:this.props.value})
    this.onStarRatingPress(3)
  } */
  onStarRatingPress(index) {
    let { data } = this.state;
    data = data.map((e, i) => {
      if (i <= index) {
        return {
          ...e,
          isActive: true
        };
      }
      return {
        ...e,
        isActive: false
      };
    });
    this.setState({
      data,
      value: index + 1
    });
    this.props.selectedStar(index + 1);
  }
  render() {
    return (
      <Fragment>
        <View
          style={{
            // flexDirection: "row",
            alignSelf: "stretch",
            alignItems: "center"
            // justifyContent:'center'
          }}
        >
          {this.state.data.map((e, i) => {
            return (
              <TouchableOpacity
                style={{
                  marginLeft: (i + 1) % 2 && 5
                }}
                key={i.toString()}
                onPress={() => this.onStarRatingPress(i)}
              >
                {!e.isActive ? emptyStar : fullStar}
              </TouchableOpacity>
            );
          })}
          <View>
            <Text>{this.state.value}</Text>
          </View>
        </View>
      </Fragment>
    );
  }
}

export default StarRating;
