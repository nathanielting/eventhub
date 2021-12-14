function transformSchemaFieldToHeader(field) {
  let newfield = {
    text: field.label,
    value: field.name,
    sortable: true
  }
  return newfield;
}

function schemaHeaders(model_schema) {
  let headers = model_schema.map(field => transformSchemaFieldToHeader(field));
  headers.push({ text: 'Actions', value: 'actions', sortable: false })
  return headers;
}

function capitalize(word){
    return word.charAt(0).toUpperCase()+word.slice(1)
}

module.exports = {
  schemaHeaders: schemaHeaders,
  capitalize: capitalize
}