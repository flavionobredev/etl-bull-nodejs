export enum HeadersEnum {
  nome = 'name',
  'nome do cliente' = 'name',
  cliente = 'name',
  email = 'email',
  'e-mail' = 'email',
  telefone = 'phone',
  celular = 'phone',
  contato = 'phone',
  tags = 'tags',
  tag = 'tags',
  código = 'code',
  codigo = 'code',
  'canal' = 'channel',
}

export namespace HeadersEnum {
  export function parseHeaders(headers: string[]) {
    return headers.map((header) => {
      return HeadersEnum[header?.toLowerCase()] || null;
    });
  }
}
