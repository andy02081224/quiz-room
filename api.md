# Quiz Room API Doc

### Question Set

##### List question set

Return question set list

```
GET /api/questionset
```

###### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| minIndex | string |             |
| maxIndex | string |             |

###### response 

```json
[{
  "id": 1,
  "title": "q1 title",
  "subtitle": "q1 subtitle",
  "description": "q1 description"
}, {
  "id": 2,
  "title": "q2 title",
  "subtitle": "q2 subtitle"
  "description": "q1 description"
}]
```



##### Create question set

Create new question set

```
POST /api/questionset
```

###### Input

| Name        | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| title       | string | __Required__. Title of the question set  |
| subtitle    | string | Subtitle of the question set             |
| description | string | Description of the question set          |
| questions   | object | Questions in the question set. See below example |

###### Questions Object example

```json
/** 
 * There are only two question types right now:
 * 1. question-true-false
 * 2. question-multiple
 * When question type is "question-multiple", options array must be specified
 */

{
  "questions": [{
  	"type": "question-true-false",
    "title": "title of the question",
    "answer" "true | false"
  }, {
  	"type": "question-multiple",
    "title": "title of the question",
    "options": ["a:1925", "b:1935", "c:1945", "d:1955"],
    "answer": "c:1945"
  }]
}
```

###### Full example

```json
{
	"title": "Question Set 1",
	"subtitle": "very interesting questions",
	"description": "Some very interesting descriptions",
	"questions": [{
		"type": "question-true-false",
		"title": "Taipei 101 is the tallest building in the world",
		"answer": false
	}, {
		"type": "question-true-false",
		"title": "NBA is the highest paid sport league in the world",
		"answer": true
	}, {
		"type": "question-multiple",
		"title": "When did World War II end",
		"options": ["a:1925", "b:1935", "c:1945", "d:1955"],
		"answer": "c:1945"
	}]
}
```

##### Get question set

Get specifed question set

```
GET /api/questionset/:id
```

###### Response

```json
{
	"title": "Question Set 1",
	"subtitle": "very interesting questions",
	"description": "Some very interesting descriptions",
	"questions": [{
		"type": "question-true-false",
		"title": "Taipei 101 is the tallest building in the world",
		"answer": false
	}, {
		"type": "question-true-false",
		"title": "NBA is the highest paid sport league in the world",
		"answer": true
	}, {
		"type": "question-multiple",
		"title": "When did World War II end",
		"options": ["a:1925", "b:1935", "c:1945", "d:1955"],
		"answer": "c:1945"
	}]
}
```

