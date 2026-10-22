// The form endpoint is injected at build time (see .env.example) and is still pending
// ([ENDPOINT FORMULARIO]); without it the form reports an error instead of submitting.
export const FORM_ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';
