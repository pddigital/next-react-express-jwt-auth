import Layout from '../components/layout';

export default ({children})=> (
    <div>
        {children}
        <style jsx global>
        {
            `
            html {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 16px;
                }
                *, *:before, *:after {
                -webkit-box-sizing: inherit;
                -moz-box-sizing: inherit;
                box-sizing: inherit;
            }

            body {
                font-family: Verdana;
            }

            h1 {
                text-transform: uppercase;
                text-align: center;
                font-size: 3rem;
            }

            section {
                margin: auto;
                width: 100%;
                max-width: 400px;
            }
            
            input[type="password"] {
                width: 100%;
                padding: 10px;
                
            }

            input[type="email"] {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
            }

            button {
                font-size: 1rem;
                width: 100%;
                background-color #222;
                color: white;
                border: 1px solid #222;       
                margin-top: 10px;
                padding: 10px;
            }

            label {
                font-weight: 400;
                margin-right: 10px;
                font-size: .85rem;
                
            }
  
            button:hover {
                cursor: pointer;
            }
            
            `
        }
        </style>
    </div>
)