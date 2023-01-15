const MyHeader = ({ headText, leftChild, rightChild }) => {
  return (
    <header className="MyHeader">
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};

export default MyHeader;
