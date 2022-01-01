import React from 'react'

const About = ({user}) => {
    return (
        <div style={{padding: "5rem", textAlign: "center"}}>
            <h3>- About CLSFY -</h3>
            CLSFY's goal is to make machine learning and artificial intelligence classifying algorithms
            accessible without knowing how to code.
            <hr/>

            Upload a file with data of classification task that needs an algoithm's help |
            Build and save a model | View model scores & statistics |
            Make informed, useful predictions
            <hr/>
            {!user?
                <>
                    Login to save & predict on trained models
                    <hr/>
                </>
            : 
                <>
                    Welcome,{' '} {user.displayName}
                </>
            }
      </div>
    )
}

export default About
