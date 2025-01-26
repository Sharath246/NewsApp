import { Outlet, useNavigate } from "react-router-dom";
import "./Edutainment.css";
import { Button, Card } from "react-bootstrap";

export default function Edutainment() {
  return(
    <Outlet/>
  )
}

export function Games(){
  const navigate = useNavigate();
  function navigateFunction(to: string) {
    navigate(to);
  }
  return (
    <div className="edutainment-container">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/25596343/pexels-photo-25596343.jpeg"
          style={{ height: 300, width: 300 }}
        />
        <Card.Body>
          <Card.Title>Sudoku</Card.Title>
          <Button
            variant="primary"
            onClick={() => {
              navigateFunction("sudoku");
            }}
          >
            Play Sudoku
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/6863511/pexels-photo-6863511.jpeg"
          style={{ height: 300, width: 300 }}
        />
        <Card.Body>
          <Card.Title>CrossWord</Card.Title>
          <Button
            variant="primary"
            onClick={() => {
              navigateFunction("crossword");
            }}
          >
            Play CrossWord
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
