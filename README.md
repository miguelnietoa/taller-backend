# taller-backend

La empresa compartió los siguientes lineamientos:
- [x] Se busca que cada modelo tenga su respectivo CRUD.
- [x] Se busca que sea posible, de manera opcional, recibir la información de los modelos 3d o imágenes 2d de los modelos que los contenga.
- [ ] Se busca que sea posible recibir todas las misiones que entrega un personaje.
- [ ] Se busca que sea posible recibir todos los personajes de un jugador.
- [x] Se busca que los objetivos de una misión se reciban siempre que se pida información de una(s) misión(es).
- [ ] Se busca que los stats de un personaje se reciban siempre que se pida información de un(os) personaje(s).
- [ ] Por razones de seguridad, se busca que sea posible restaurar objetos borrados.
- [ ] Se busca que sea posible recibir todas las misiones que puede aceptar un personaje.
- [ ] Se busca que no sea posible modificar el jugador dueño de un personaje.
- [x] Se busca que no sea posible modificar la misión de un objetivo.
- [x] Se busca que no sea posible modificar los campos life, power y magic de los stats de un personaje.
- [x] Se busca que los campos life, power y magic se rijan con las siguientes reglas:
o 𝑙𝑖𝑓𝑒 = 𝑎𝑡𝑡𝑟𝑖𝑏𝑢𝑡𝑒1 ∗ 20
o 𝑝𝑜𝑤𝑒𝑟 = 𝑎𝑡𝑡𝑟𝑖𝑏𝑢𝑡𝑒1 ∗ 10+ 𝑎𝑡𝑡𝑟𝑖𝑏𝑢𝑡𝑒2 ∗ 25
o 𝑚𝑎𝑔𝑖𝑐 = 𝑎𝑡𝑟𝑟𝑖𝑏𝑢𝑡𝑒3 ∗ 100
- [ ] Se busca que sea posible hacer “login” como player y actualizar el last_login de este.
