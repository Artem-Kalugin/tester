export class ValidateProfile {
  static email(email) {
    console.log(email);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static password(password) {
    console.log(password);
    const re = new RegExp("^(?=.{8,})");
    return re.test(String(password).toLowerCase());
  }
}