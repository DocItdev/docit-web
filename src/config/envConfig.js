

export default function getVar(varName) {
  return process.env[`REACT_APP_${varName}`];
}