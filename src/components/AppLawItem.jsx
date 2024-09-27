import "./AppLawItem.css";

function AppLawItem(props) {
  const { law } = props;

  return (
    <div>
      <div>
        {/* <img alt="law-item" scr="http://picsum.photos/200/300"></img> */}
        <h3 className="">{law.title}</h3>
        <h3 className="">{law.status}</h3>
        {/* <div>{ law.description }</div> */}
      </div>
    </div>
  );
}

export default AppLawItem;
