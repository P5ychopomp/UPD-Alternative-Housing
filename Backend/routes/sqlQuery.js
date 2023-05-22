// General SQL statement construction

class queryField {
  constructor(filter, value) {
    this.filter = filter;
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getFormatted() {
    return this.value;
  }

  getFilter() {
    return this.filter;
  }
}

// for filters with multiple possible filter values (inclusions, lot type, etc.)
class mQueryField extends queryField {
  constructor(filter, value, select) {
    super(filter, value);
    this.f = [];
    this.v = [];
    if (this.value != null) {
      for (let key of this.value) {
        this.f.push(this.filter);
        this.v = this.v.concat(select[key]);
      }
      this.filter = "(" + this.f.join(" OR ") + ")";
      this.value = this.v;
    }
  }
}

class SQLQuery {
  queryValues = [];
  queryFilters = [];

  constructor(clause, fields) {
    this.sql = clause;
    this.fields = fields;
  }

  noSpecialCharacters(data) {
    // input validation: allowlisting, placeholders, illegal characters
    let c = "";
    if ((c = data.match(/[`'/\*%;\+\|\<\>=!\.\-]/))) {
      // special characters to avoid
      console.log(`Illegal character found: ${c} in ${data}`);
      return 0;
    }
    return 1;
  }

  formatFilters(key) {
    this.queryValues = this.queryValues.concat(this[key].getFormatted());
    this.queryFilters = this.queryFilters.concat(this[key].getFilter());
  }

  build() {
    for (let key of Object.keys(this.fields)) {
      // append each filter parameter in request to sql statement
      // guard clause against special characters
      if (!this.noSpecialCharacters(String(this[key].getValue()))) {
        return 400;
      }
      this.formatFilters(key);
    }
  }

  getSQL() {
    return this.sql;
  }

  getValues() {
    return this.queryValues;
  }
}

module.exports = {
  queryField,
  mQueryField,
  SQLQuery,
};
