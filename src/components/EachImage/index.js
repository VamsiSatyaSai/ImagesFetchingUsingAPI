import "./index.css";

const EachImage = (props) => {
  const { imageUrl, description } = props;
  return (
    <li className="container">
      <img src={imageUrl} alt="unsplash" className="each-photo" />
      <div className="middle">
        <p className="description">{description}</p>
      </div>
    </li>
  );
};
export default EachImage;
