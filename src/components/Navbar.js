import React ,{useState, useEffect} from 'react';
import logo from '../Logo_ML@2x.png.png.png';
import iconSerach from '../images/ic_Search.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,  Container, FormControl, Image, Form} from 'react-bootstrap';


function NavbarComponent() {

    const [form, setForm] = useState({"q":''});


    const getQuery = () => {
        const searchParams =  new URLSearchParams(document.location.search.substring(1));
        return (searchParams.get("q")== null) ? '' : searchParams.get("q");
    }

    const handleSubmit = () => {
        console.log("SUBMIT");
    }

    const handleChange =  (e) => {
        e.persist();
        setForm({
                ...form,
                [e.target.name]: e.target.value
        })
    }

    useEffect(() => {setForm({q: getQuery()})}, []);

        return (
                <div className="">
                    <Navbar className="nav-header">
                        <Container>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <div className="m-2">
                                    <Image src={logo} className="nav-logo"/>
                                </div>

                                <Form action="/items" className="form-search" onSubmit={handleSubmit}>
                                        <div className="input-group">
                                            <FormControl
                                                type="search"
                                                placeholder="Nunca dejes de buscar "
                                                className=""
                                                aria-label="Search"
                                                onChange={handleChange}
                                                value={form.q}
                                                name="q"
                                                id="q"
                                            />
                                            <div className="input-group-append">
                                          <span className="input-group-text" id="basic-addon2">.
                                              <Image src={iconSerach}/>
                                          </span>
                                            </div>
                                        </div>
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
        );

}

export default NavbarComponent;
