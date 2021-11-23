import { Component } from "react";

class Carousel extends Component {

  state = {
    active: 0,
  };

  static defaultProps = {
    photos: [{
      medium: 'https://source.unsplash.com/featured/?pets'
    }]
  }

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };


  render() {
    const { active } = this.state; // state is contain within the component
    const { images } = this.props; // props is from the parent

    return (
      <div className="carousel">
        <img src={images[active].medium} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo.medium}
              src={photo.medium}
              data-index={index}
              onClick={this.handleIndexClick}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;


// class Carousel extends Component {

//   state = {
//     active: 0,
//   };


//   static defaultProps = {
//     images: ['https://source.unsplash.com/featured/?pets']
//   }



//   handleIndexClick = (event) => {
//     this.setState({
//       active: +event.target.dataset.index,
//     });
//   };

//   render() {
//     const { active } = this.state; // state is contain within the component
//     const { images } = this.props; // props is from the parent

//     return (
//       <div className="carousel">
//         <img src={images[active].medium} alt="animal" />
//         <div className="carousel-smaller">
//           {images.map((photo, index) => (
//             // eslint-disable-next-line
//             <img
//               key={photo.medium}
//               src={photo.medium}
//               data-index={index}
//               onClick={this.handleIndexClick}
//               className={index === active ? "active" : ""}
//               alt="animal thumbnail"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
