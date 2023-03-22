import React, { useState } from 'react'
import { Form } from 'react-router-dom'

const LandlordRegister = () => {
  const [name, setName] = useState("");

  return (
    <div>
        <Form>
            <label>Name
              <input
                type = "text"
                value = {name}
                onChange = {(e) => setName(e.target.value)}
              />
            </label>
        </Form>
    </div>
  )
}

export default LandlordRegister