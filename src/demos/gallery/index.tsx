import CheckBox from '@/components/ui/checkbox'
import Drawer from '@/components/ui/drawer'
import Switch from '@/components/ui/switch'

import React, { useState } from 'react'

export default function Gallery() {
  const [on, toggle] = useState(false)

  const [checked, setChecked] = useState(false)
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Switch on={on} onToggle={toggle} />
      <CheckBox name={'cb1'} checked={checked} onToggle={setChecked} />

      <Drawer titleDom={<div>title</div>}>
        <div>child 1</div>
        <div>child 2</div>
      </Drawer>
    </div>
  )
}
