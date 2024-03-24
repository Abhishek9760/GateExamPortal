import { useEffect, useState } from "react";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    let auth = localStorage.getItem("auth");
    if (auth) {
      auth = JSON.parse(auth);
      readKey(auth.key, auth.email);
    }
  }, []);

  const readKey = async (key, email) => {
    try {
      const docRef = await getDocs(collection(db, "keys")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          let isAuth = false;
          newData.forEach((i) => {
            if (isAuth) return;
            if (i["id"] === key && i["email"] === email) {
              localStorage.setItem("auth", JSON.stringify({ key, email }));
              isAuth = true;
              setIsLoggedIn(isAuth);
            }
          });
          if (!isAuth) alert("Sorry wrong email or key");
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addDataToDB = async (email) => {
    try {
      const docRef = await addDoc(collection(db, "keys"), {
        email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleLogin = async () => {
    if (email.trim() && isSignUp) {
      await addDataToDB(email);
      setShowSecret(true);
    }
    if (!isSignUp && email.trim() && key.trim()) {
      readKey(key, email);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={handleLogin}>
          <h3>Gate Exam Portal</h3>
          <Segment stacked tertiary>
            {isSignUp ? (
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Enter your email"
                type="email"
                required
                onChange={(e, data) => setEmail(data.value)}
              />
            ) : (
              <>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter your email"
                  type="email"
                  required
                  onChange={(e, data) => setEmail(data.value)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter your key"
                  type="password"
                  required
                  onChange={(e, data) => setKey(data.value)}
                />
              </>
            )}

            <Button color="teal" fluid size="large">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?{" "}
          <Button basic secondary onClick={() => setIsSignUp(!isSignUp)}>
            {!isSignUp ? "Sign up" : "Login"} here
          </Button>
        </Message>
        {showSecret && (
          <Message>
            <Message.Header
              style={{
                backgroundColor: "transparent",
                width: "inherit",
                borderRadius: 0,
                boxShadow: "0px 0px",
              }}
            >
              Success
            </Message.Header>
            <p>
              <a href="https://t.me/Lolboi22" target="_blank">
                Contact here
              </a>{" "}
              to activate your account and get your <b>KEY</b>.
            </p>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
