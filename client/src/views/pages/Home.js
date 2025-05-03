import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="mt-5">
      <h1 className="mb-4">Chào mừng đến với QAirline</h1>
      <p>Đặt vé máy bay nhanh chóng, tiện lợi và an toàn.</p>
      <Button as={Link} to="/flights" variant="primary" className="mb-5">
        Tìm chuyến bay
      </Button>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Khuyến mãi mùa hè</Card.Title>
              <Card.Text>Giảm giá 30% khi đặt vé trước 7 ngày.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Bay cùng gia đình</Card.Title>
              <Card.Text>Miễn phí 1 hành lý ký gửi cho trẻ em dưới 10 tuổi.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;