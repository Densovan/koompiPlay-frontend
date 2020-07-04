// import React from 'react'
// const data = [
//     {id : '1',
//      tabTitle: "Tab 1",
//      tabContent: 'Tab Content 1'
//     },
//     {id : '2',
//      tabTitle: "Tab 2",
//      tabContent: 'Tab Content 2'
//     },
//     {id : '3',
//      tabTitle: "Tab 3",
//      tabContent: 'Tab Content 3'
//     }
//   ]

// const Transaction = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default Transaction

import React, { useState } from "react";
import { Tabs, Tab, Content } from "../Tab/tab";

const Transaction = () => {
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  return (
    <div className=" mx-auto  px-4 py-12  max-w-screen-lg sm:px-2">
      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          All
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1}>
          Send
        </Tab>
        <Tab onClick={handleClick} active={active === 2} id={2}>
          Recieve
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <h1>All</h1>
        </Content>
        <Content active={active === 1}>
          <h1>Send</h1>
        </Content>
        <Content active={active === 2}>
          <h1>Recieved</h1>
        </Content>
      </>
      {/* <Tabs>
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
          </TabList>
  
          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs> */}
    </div>
  );
};

export default Transaction;
