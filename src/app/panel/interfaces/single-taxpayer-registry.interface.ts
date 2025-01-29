export interface SingleTaxpayerRegistry {
  NUMERO_RUC:                  number;
  RAZON_SOCIAL:                string;
  CODIGO_JURISDICCION:         string;
  ESTADO_CONTRIBUYENTE:        string;
  CLASE_CONTRIBUYENTE:         string;
  FECHA_INICIO_ACTIVIDADES:    Date;
  FECHA_ACTUALIZACION:         Date | null;
  FECHA_SUSPENSION_DEFINITIVA: Date | null;
  FECHA_REINICIO_ACTIVIDADES:  Date | null;
  OBLIGADO:                    string;
  TIPO_CONTRIBUYENTE:          string;
  NUMERO_ESTABLECIMIENTO:      number;
  NOMBRE_FANTASIA_COMERCIAL:   null | string;
  ESTADO_ESTABLECIMIENTO:      string;
  DESCRIPCION_PROVINCIA_EST:   string;
  DESCRIPCION_CANTON_EST:      string;
  DESCRIPCION_PARROQUIA_EST:   string;
  CODIGO_CIIU:                 string;
  ACTIVIDAD_ECONOMICA:         string;
  AGENTE_RETENCION:            string;
  ESPECIAL:                    string;
}
