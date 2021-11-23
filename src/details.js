import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./carousel";
import ErrorBoundary from "./errorboundary";
import ThemeContext from "./themeContext";
import Modal from "./modal";
import pf from "./api";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await pf.animal.search();
    const datas = await res.data.animals;
    // console.log(this.props.match.params.id);
    datas.map((data) => {
      if (data.id == this.props.match.params.id) {
        this.setState(
          Object.assign(
            {
              loading: false,
            },
            data
          )
        );
      }
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "https://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }

    const { showModal } = this.state;

    console.log(this.state);

    return (
      <div className="details">
        <Carousel images={this.state.photos} />
        <div>
          <h1>{this.state.name}</h1>
          <h2>
            {this.state.type} - {this.state.breeds.primary}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {this.state.name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{this.state.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {this.state.name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// class components
// class Details extends Component {
//   state = { loading: true, showModal: false };

//   async componentDidMount() {
//     const res = await fetch(
//       `https://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
//     );

//     const json = await res.json();
//     this.setState(
//       Object.assign(
//         {
//           loading: false,
//         },
//         json.pets[0]
//       )
//     );
//   }

//   toggleModal = () => this.setState({ showModal: !this.state.showModal });
//   adopt = () => (window.location = 'https://bit.ly/pet-adopt');

//   render() {
//     if (this.state.loading) {
//       return <h2>loading ...</h2>;
//     }

//     const { animal, breed, city, state, description, name, images, showModal } =
//       this.state;

//     return (
//       <div className="details">
//         <Carousel images={images} />
//         <div>
//           <h1>{name}</h1>
//           <h2>
//             {animal} - {breed} - {city}, {state}
//           </h2>
//           <ThemeContext.Consumer>
//             {([theme]) => (
//               <button onClick={this.toggleModal}
//               style={{ backgroundColor: theme }}>Adopt {name}</button>
//             )}
//           </ThemeContext.Consumer>
//           <p>{description}</p>
//           {
//             showModal ? (
//               <Modal>
//                 <div>
//                   <h1>Would you like to adopt {name}?</h1>
//                   <div className="buttons">
//                     <button onClick={this.adopt}>Yes</button>
//                     <button onClick={this.toggleModal}>No</button>
//                   </div>
//                 </div>
//               </Modal>
//             ) : null
//           }
//         </div>
//       </div>
//     );
//   }
// }

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
