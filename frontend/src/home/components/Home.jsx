import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
    const [wordCount, setWordCount] = useState(0);
    const [inputValue, setInputValue] = useState(''); 
    const [chat, setChat] = useState([]);

    const handleTextChange = (event) => {
        const text = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
        setWordCount(text.length);
        setInputValue(text); 
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 
    
        try {
            const response = await axios.post("http://localhost:8080/preguntas", {
                pregunta: inputValue
            });
    
            const respuesta = response.data.respuesta;
    
            setChat(prevChat => [...prevChat, { question: inputValue, answer: respuesta }]);
            setInputValue('');
            setWordCount(0);
        } catch (error) {
            console.error("Error al obtener la respuesta:", error);
        }
    }

    return (
        <Card className="">
            <Card.Body>
                <Card.Title className='text-center'>PROTOTIPO OpenAI</Card.Title>
                    <Card.Text>
                        <Form onSubmit={handleSubmit}> {/* Agrega un manejador de envío al formulario */}
                            <br />
                            <ButtonGroup className="p-5">
                                <DropdownButton as={ButtonGroup} title="Artículo" id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="1">Con artículo</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Sin artículo</Dropdown.Item>
                                </DropdownButton>
                                <DropdownButton as={ButtonGroup} title="Tono" id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="1">Alegre</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Triste</Dropdown.Item>
                                </DropdownButton>
                                <DropdownButton as={ButtonGroup} title="Hashtags" id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="1">Con hashtags</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Sin hashtags</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                            <br />
                            {chat.map((item, index) => ( // Itera sobre el chat y renderiza cada pregunta y respuesta
                                <div key={index}>
                                    <div className='card p-2'>
                                        <Row>
                                            <Col><Badge bg="primary" className='text-start'>Pregunta:</Badge></Col>
                                        </Row>
                                        <p className='text-justify mt-1'>{item.question}</p>
                                    </div>
                                    <br />
                                    <div className='card p-2'>
                                        <Row>
                                            <Col><Badge bg="success" className='text-end'>Respuesta:</Badge></Col>
                                        </Row>
                                        <p className='text-justify mt-1'>{item.answer}</p>
                                    </div>
                                    <br />
                                </div>
                            ))}
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                    placeholder="Pregúntame cualquier cosa"
                                    aria-label="Pregúntame cualquier cosa"
                                    aria-describedby="basic-addon2"
                                    onChange={handleTextChange}
                                    value={inputValue} // Agrega el valor del input
                                    />
                                    <Button variant="outline-secondary" id="button-addon2" type="submit">
                                        Enviar
                                    </Button>
                                </InputGroup>
                                <p className='text-end mt-2'>{wordCount}/400</p>
                            </Form.Group>
                        </Form>
                    </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Home;
