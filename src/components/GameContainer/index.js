import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as MemoryActions } from "../../store/ducks/memory";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardBoard from "../CardBoard";

import { useBlockChain } from "../../blockchain";
import CardListView from "../CardListView";

const GameContainer = (props) => {
  const { isLoged, account, balance, doLogin, doMint, myTokens } =
    useBlockChain();

  const handleLogin = async () => {
    await doLogin();
  };

  const handleOnRegistered = async () => {
    alert("Token registrado com sucesso. Sua transação está sendo processada")
  }

  const handleReceipt = async () => {
    alert("Sua NFT foi mintada com sucesso. Aguardando confirmação")
  }

  const handleConfirmation = async () => {

  }

  const handleError = async (message) => {
    alert(message)
  }

  const eventHandlers = {
    onRegistered: handleOnRegistered,
    onReceipt: handleReceipt,
    onConfirmation: handleConfirmation,
    onError: handleError,
  };

  const handleOnWonCard = (cardId, cardUrl) => {
    console.log(cardId);
    console.log(cardUrl);

    doMint(cardUrl, eventHandlers);
  };

  return (
    <Container>
      <Row>
        <h2 className="text-center" style={{ padding: "20px" }}>
          Memory Game
        </h2>
      </Row>
      {!isLoged ? (
        <Row>
          <Button onClick={handleLogin}>Login</Button>
        </Row>
      ) : (
        <div>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <CardBoard {...props} onWonCard={handleOnWonCard}></CardBoard>
            </Col>
          </Row>
          <Row>
            <CardListView tokens={myTokens}></CardListView>
          </Row>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  memory: state.memory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(MemoryActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
