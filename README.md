# exposy-cli

CLI tool to expose localhost port to internet via exposy server

## What is **Exposy** ?

Exposy is a solution for exposing developer's local HTTP APIs over Internet using a `single command`.

## How does **Exposy** work?

Exposy system has 2 components:

- [exposy-server](https://github.com/exposy/exposy-server)
  > **exposy-server** is a web socket server & http server,that needs to be hosted & made available over internet. This proxies http requests coming over internet to **_exposy-cli_** socket client via a unique http end point specific to developer's machine & specified port. See design diagrams to know more.
- [exposy-cli](https://github.com/exposy/exposy-cli)
  > **exposy-client** is npm based CLI that needs to be installed on developer's system. It connects to **_exposy-server_** via web sockets & interchanges data to & from localhost web apps by calling localhost & sending response back to **_exposy-server_** over socket.See design diagrams to know more.

<br/>

## Design Diagrams

### Overall Design

![Overall](https://user-images.githubusercontent.com/15920476/193417858-d8e342ff-876f-447b-a697-9bfdd188f0d0.png)

### Exposy CLI Design

![exposy cli](https://user-images.githubusercontent.com/15920476/193417874-bb39981d-a324-4920-bf5e-b07616db3faf.png)

### Exposy Server Design

![exposy server](https://user-images.githubusercontent.com/15920476/193417877-17a4a24f-7477-4f8b-8246-a0b887f4980b.png)
