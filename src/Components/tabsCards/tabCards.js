import React from 'react';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../tabsCards/styles.css'

export default function tabsCards({ cabecalho, formation, xp,objective, Profile, cursos}) {
  return (
    <Container className='py-4'>

      <Row className='justify-content-center'>
        <Tabs justify variant='pills' defaultActiveKey={'tab-1'} className='mb-1 p-0' >
          <Tab eventKey='tab-1' title='Dados pessoais' >
            <div id='colorLabelText'>
              {cabecalho}
            </div>
          </Tab>
            <Tab eventKey='tab-2' title='Perfil' >
            <div id='colorLabelText'>
              {Profile}
            </div>
          </Tab>
           <Tab eventKey='tab-3' title='Objetivo'>
            <div id='colorLabelText'>
              {objective}
            </div>
          </Tab>
          <Tab eventKey='tab-4' title='Formação'>
            <div id='colorLabelText'>
              {formation}
            </div>
          </Tab>
          <Tab eventKey='tab-5' title='Experiência'>
            <div id='colorLabelText'>
              {xp}
            </div>
          </Tab>
          <Tab eventKey='tab-6' title='Cursos'>
            <div id='colorLabelText'>
              {cursos}
            </div>
          </Tab>
        </Tabs>

      </Row>
    </Container>
  );
}