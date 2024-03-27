const Calculator = () => {
  return (
    <div
      id="ec_calculator_instance"
      style={{ display: "block" }}
      className="ui-draggable ui-draggable-handle"
    >
      <div
        id="keyPad"
        className="calc_container"
        style={{ position: "absolute" }}
      >
        <div className="calc_close" id="closeButton">
          X
        </div>
        <input
          type="text"
          id="keyPad_UserInput1"
          className="keyPad_TextBox1"
          readOnly="readonly"
        />
        <div className="text_container">
          <input
            type="text"
            id="keyPad_UserInput"
            className="keyPad_TextBox"
            maxLength={30}
            readOnly="readonly"
          />
          <span
            id="memory"
            className="memoryhide importantRuleMemoryScientific"
            style={{ height: 22 }}
          >
            <font size={2}>M</font>
          </span>
        </div>
        <div className="clear" />
        <div className="left_sec">
          <div className="calc_leftPanel">
            <div className="calc_row clear">
              <a href="#nogo" id="keyPad_btnMod" className="keyPad_btnBinaryOp">
                mod
              </a>
              <div className="degree_radian" style={{ width: 80 }}>
                <input
                  type="radio"
                  name="degree_or_radian"
                  defaultValue="deg"
                  defaultChecked="checked"
                />
                Deg
                <input
                  type="radio"
                  name="degree_or_radian"
                  defaultValue="rad"
                />
                Rad
              </div>
              <a
                href="#nogo"
                id="keyPad_btnPi"
                className="keyPad_btnConst"
                style={{ visibility: "hidden" }}
              >
                π
              </a>
              <a
                href="#nogo"
                id="keyPad_btnE"
                className="keyPad_btnConst"
                style={{ visibility: "hidden" }}
              >
                e
              </a>
              <a
                href="#nogo"
                id="keyPad_btnE"
                className="keyPad_btnConst"
                style={{ visibility: "hidden" }}
              >
                e
              </a>
            </div>
            <div className="calc_row clear">
              <a
                href="#nogo"
                id="keyPad_btnSinH"
                className="keyPad_btnUnaryOp min"
              >
                sinh
              </a>
              <a
                href="#nogo"
                id="keyPad_btnCosinH"
                className="keyPad_btnUnaryOp min"
              >
                cosh
              </a>
              <a
                href="#nogo"
                id="keyPad_btnTgH"
                className="keyPad_btnUnaryOp min"
              >
                tanh
              </a>
              <a href="#nogo" id="keyPad_EXP" className="keyPad_btnBinaryOp">
                Exp
              </a>
              <a
                href="#nogo"
                id="keyPad_btnOpen"
                className="keyPad_btnBinaryOp "
              >
                (
              </a>
              <a
                href="#nogo"
                id="keyPad_btnClose"
                className="keyPad_btnBinaryOp "
              >
                )
              </a>
            </div>
            <div className="calc_row clear">
              <a
                href="#nogo"
                id="keyPad_btnAsinH"
                className="keyPad_btnUnaryOp min "
              >
                <span className="baseele">sinh</span>
                <span className="superscript">-1</span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnAcosH"
                className="keyPad_btnUnaryOp min "
              >
                <span className="baseele">cosh</span>
                <span className="superscript">-1</span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnAtanH"
                className="keyPad_btnUnaryOp min "
              >
                <span className="baseele">tanh</span>
                <span className="superscript">-1</span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnLogBase2"
                className="keyPad_btnUnaryOp"
              >
                <span className="baseele">log</span>
                <span className="subscript">2</span>
                <span className="baseele">x</span>
              </a>
              <a href="#nogo" id="keyPad_btnLn" className="keyPad_btnUnaryOp">
                ln
              </a>
              <a href="#nogo" id="keyPad_btnLg" className="keyPad_btnUnaryOp">
                log
              </a>
            </div>
            <div className="calc_row clear">
              <a href="#nogo" id="keyPad_btnPi" className="keyPad_btnConst">
                π
              </a>
              <a href="#nogo" id="keyPad_btnE" className="keyPad_btnConst">
                e
              </a>
              <a href="#nogo" id="keyPad_btnFact" className="keyPad_btnUnaryOp">
                n!
              </a>
              <a
                href="#nogo"
                id="keyPad_btnYlogX"
                className="keyPad_btnBinaryOp "
              >
                <span className="baseele">log</span>
                <span className="subscript">y</span>
                <span className="baseele">x</span>
              </a>
              <a href="#nogo" id="keyPad_btnExp" className="keyPad_btnUnaryOp">
                <span className="baseele">e</span>
                <span className="superscript">x</span>
              </a>
              <a href="#nogo" id="keyPad_btn10X" className="keyPad_btnUnaryOp">
                <span className="baseele">10</span>
                <span className="superscript">x</span>
              </a>
            </div>
            <div className="calc_row clear">
              <a
                href="#nogo"
                id="keyPad_btnSin"
                className="keyPad_btnUnaryOp min "
              >
                sin
              </a>
              <a
                href="#nogo"
                id="keyPad_btnCosin"
                className="keyPad_btnUnaryOp min"
              >
                cos
              </a>
              <a
                href="#nogo"
                id="keyPad_btnTg"
                className="keyPad_btnUnaryOp min"
              >
                tan
              </a>
              <a
                href="#nogo"
                id="keyPad_btnYpowX"
                className="keyPad_btnBinaryOp"
              >
                <span className="baseele">x</span>
                <span className="superscript">y</span>
              </a>
              <a href="#nogo" id="keyPad_btnCube" className="keyPad_btnUnaryOp">
                <span className="baseele">x</span>
                <span className="superscript">3</span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnSquare"
                className="keyPad_btnUnaryOp"
              >
                <span className="baseele">x</span>
                <span className="superscript">2</span>
              </a>
            </div>
            <div className="calc_row clear">
              <a
                href="#nogo"
                id="keyPad_btnAsin"
                className="keyPad_btnUnaryOp min"
              >
                <span className="baseele">sin</span>
                <span className="superscript">-1</span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnAcos"
                className="keyPad_btnUnaryOp min"
              >
                <span className="baseele">cos</span>
                <span className="superscript">-1</span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnAtan"
                className="keyPad_btnUnaryOp min"
              >
                <span className="baseele">tan</span>
                <span className="superscript">-1</span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnYrootX"
                className="keyPad_btnBinaryOp"
              >
                <span className="superscript" style={{ top: "-8px" }}>
                  y
                </span>
                <span
                  className="baseele"
                  style={{ fontSize: "1.2em", margin: "-6px 0 0 -9px" }}
                >
                  √x
                </span>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnCubeRoot"
                className="keyPad_btnUnaryOp"
              >
                <font size={3}>∛ </font>
              </a>
              <a href="#nogo" id="keyPad_btnAbs" className="keyPad_btnUnaryOp">
                <span className="baseele">|x|</span>
              </a>
            </div>
            <div className="calc_row clear" />
          </div>
          <div className="calc_rightPanel">
            <div className="calc_row clear">
              <a href="#nogo" id="keyPad_MC" className="keyPad_btnMemoryOp">
                MC
              </a>
              <a href="#nogo" id="keyPad_MR" className="keyPad_btnMemoryOp">
                MR
              </a>
              <a href="#nogo" id="keyPad_MS" className="keyPad_btnMemoryOp">
                MS
              </a>
              <a href="#nogo" id="keyPad_M+" className="keyPad_btnMemoryOp">
                M+
              </a>
              <a href="#nogo" id="keyPad_M-" className="keyPad_btnMemoryOp">
                M-
              </a>
            </div>
            <div className="calc_row clear">
              <a
                href="#nogo"
                id="keyPad_btnBack"
                className="keyPad_btnCommand calc_arrows"
              >
                <div style={{ position: "relative", top: "-3px" }}>←</div>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnAllClr"
                className="keyPad_btnCommand"
              >
                C
              </a>
              <a
                href="#nogo"
                id="keyPad_btnInverseSign"
                className="keyPad_btnUnaryOp"
              >
                +/-
              </a>
              <a
                href="#nogo"
                id="keyPad_btnSquareRoot"
                className="keyPad_btnUnaryOp"
              >
                <div style={{ position: "relative", top: 1 }}>√</div>
              </a>
            </div>
            <div className="calc_row clear" style={{ marginTop: 5 }}>
              <a href="#nogo" id="keyPad_btn7" className="keyPad_btnNumeric">
                7
              </a>
              <a href="#nogo" id="keyPad_btn8" className="keyPad_btnNumeric">
                8
              </a>
              <a href="#nogo" id="keyPad_btn9" className="keyPad_btnNumeric ">
                9
              </a>
              <a href="#nogo" id="keyPad_btnDiv" className="keyPad_btnBinaryOp">
                /
              </a>
              <a href="#nogo" id="keyPad_%" className="keyPad_btnBinaryOp">
                %
              </a>
            </div>
            <div className="calc_row clear">
              <a href="#nogo" id="keyPad_btn4" className="keyPad_btnNumeric">
                4
              </a>
              <a href="#nogo" id="keyPad_btn5" className="keyPad_btnNumeric">
                5
              </a>
              <a href="#nogo" id="keyPad_btn6" className="keyPad_btnNumeric ">
                6
              </a>
              <a
                href="#nogo"
                id="keyPad_btnMult"
                className="keyPad_btnBinaryOp"
              >
                <div style={{ position: "relative", top: 3, fontSize: 20 }}>
                  *
                </div>
              </a>
              <a
                href="#nogo"
                id="keyPad_btnInverse"
                className="keyPad_btnUnaryOp"
              >
                <span className="baseele">1/x</span>
              </a>
            </div>
            <div className="calc_row clear">
              <a href="#nogo" id="keyPad_btn1" className="keyPad_btnNumeric">
                1
              </a>
              <a href="#nogo" id="keyPad_btn2" className="keyPad_btnNumeric">
                2
              </a>
              <a href="#nogo" id="keyPad_btn3" className="keyPad_btnNumeric">
                3
              </a>
              <a
                href="#nogo"
                id="keyPad_btnMinus"
                className="keyPad_btnBinaryOp"
              >
                <div
                  style={{ position: "relative", top: "-1px", fontSize: 20 }}
                >
                  -
                </div>
              </a>
            </div>
            <div className="calc_row clear">
              <a
                href="#nogo"
                id="keyPad_btn0"
                className="keyPad_btnNumeric"
                style={{ width: 76 }}
              >
                0
              </a>
              <a href="#nogo" id="keyPad_btnDot" className="keyPad_btnNumeric ">
                .
              </a>
              <a
                href="#nogo"
                id="keyPad_btnPlus"
                className="keyPad_btnBinaryOp"
              >
                +
              </a>
              <a
                href="#nogo"
                id="keyPad_btnEnter"
                className="keyPad_btnCommand "
              >
                <div style={{ marginBottom: 2 }}>=</div>
              </a>
            </div>
          </div>
          <div className="clear" />
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default Calculator;
