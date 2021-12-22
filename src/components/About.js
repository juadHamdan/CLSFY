import React from 'react'

const About = ({user}) => {
    return (
        <div style={{padding: "5rem", textAlign: "center"}}>
            <h3> CLSFY </h3>
            CLSFY goal is to make machine learning and artificial intelligence classifying algorithms
            accessible without knowing how to code

             Upload a file | Build and save a model | View model scores & statistics| Make informed, useful predictions
            <hr/>
            Login to save your trained model.
            <hr/>
            TODO: OnLogin, if have trained models, let user choose, open step3

            <br/> <br/>
            {user? user.displayName : null}
      </div>
    )
}

export default About
