import type { ContactInfo } from '../types';

interface Props {
  contact: ContactInfo;
  onChange: (c: ContactInfo) => void;
}

export default function ContactForm({ contact, onChange }: Props) {
  const update = (field: keyof ContactInfo, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <div className="res-section contact-form-section" role="form" aria-label="Datos de contacto">
      <h3>Datos de contacto</h3>
      <p className="rs-sub">Completa tus datos para recibir el diagnóstico completo y agendar una sesión de profundización.</p>

      <div className="row2">
        <div className="field">
          <label htmlFor="cName">Nombre completo <span className="req" aria-label="requerido">*</span></label>
          <input id="cName" value={contact.name} onChange={e => update('name', e.target.value)} placeholder="Tu nombre" aria-required="true" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cEmail">Email <span className="req" aria-label="requerido">*</span></label>
          <input id="cEmail" type="email" value={contact.email} onChange={e => update('email', e.target.value)} placeholder="tu@email.com" aria-required="true" autoComplete="email" />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="cPhone">Teléfono</label>
          <input id="cPhone" type="tel" value={contact.phone} onChange={e => update('phone', e.target.value)} placeholder="+56 9 1234 5678" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="cMessage">Mensaje adicional</label>
          <textarea id="cMessage" value={contact.message} onChange={e => update('message', e.target.value)} placeholder="¿Algún comentario o pregunta adicional?" />
        </div>
      </div>
    </div>
  );
}
