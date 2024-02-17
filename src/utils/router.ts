import { json, Params } from "react-router-dom";

export function getParamOr400(params: Params, key: string): string {
  const param = params[key]
  if (!param) {
    throw json(`Missing parameter ${key}`)
  }
  return param
}

export function getOr404<T>(value: T | null | undefined): T {
  if (!value) {
    throw json('Not found', { status: 404 })
  }
  return value
}