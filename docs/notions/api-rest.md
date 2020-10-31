# API REST

## Qu’est-ce qu’une API ?

"Application Programming Interface"


* Free API SMS pour domotique :
https://www.domotique-info.fr/2014/06/nouvelle-api-sms-chez-free/

* Paypal API pour le paiement et d’autres interactions possibles :
https://developer.paypal.com/docs/api/overview/

* Google API :
https://developers.google.com/fit/rest/v1/get-started

## REST

“REpresentational State Transfer”
Cette représentation de l'état peut être au format JSON, XML ou HTML.
Les API RESTful tirent explicitement parti des méthodologies HTTP définies par le protocole RFC 2616.

### Principes

Uniform interface
Client–server
Stateless
Cacheable
Layered system
Code on demand (optional)

https://restfulapi.net/rest-architectural-constraints/

### Règles à suivre

Règle n°1 : l’URI comme identifiant des ressources
Règle n°2 : les verbes HTTP comme identifiant des opérations
Règle n°3 : les réponses HTTP comme représentation des ressources
Règle n°4 : les liens comme relation entre ressources
Règle n°5 : un paramètre comme jeton d’authentification

https://blog.nicolashachet.com/developpement-php/larchitecture-rest-expliquee-en-5-regles/

### Frameworks dédiés

Falcon (Python), Restify (NodeJS), Django Rest FW, 
Slim, Lumen
Guzzle (middleware)
API Platform GraphQL : https://api-platform.com/docs/core/

### Divers

HATEOAS (Hypermedia as the Engine of Application State)
https://restfulapi.net/hateoas/

Status codes : https://restfulapi.net/http-status-codes/

### Bonnes pratiques

https://florimond.dev/blog/articles/2018/08/restful-api-design-13-best-practices-to-make-your-users-happy/

https://www.gekko.fr/les-bonnes-pratiques-a-suivre-pour-developper-des-apis-rest/

https://medium.com/@mwaysolutions/10-best-practices-for-better-restful-api-cbe81b06f291
