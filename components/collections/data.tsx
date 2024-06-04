import React from "react";

const columns = [
  {name: "Title", uid: "title", sortable: true},
  {name: "Products", uid: "product"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

const users = [
  {
    _id: 1,
    title: "Tony Reichert",
    status: "active",
    image: "https://i.primage.cc/150?u=a042581f4e29026024d",
    product: "tony.reichert@example.com",
    description:"hie"
  },
  {
    _id: 2,
    title: "Zoey Lang",
    status: "paused",
    description:"hie",
    image: "https://i.primage.cc/150?u=a042581f4e29026704d",
    product: "zoey.lang@example.com",
  },
 
 
  
];

export {columns, users, statusOptions};
