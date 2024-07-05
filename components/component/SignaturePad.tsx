// components\component\SignaturePad.tsx
'use client';

import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
    fontSize: 12,
  },
  signature: {
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
  },
});

interface Empleado {
  nombre: string;
  curp: string;
  rfc: string;
  nss: string;
}

interface Props {
  empleado: Empleado;
  codigo: string;
}

const SignaturePad: React.FC<Props> = ({ empleado, codigo }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    sigCanvas.current?.clear();
  };

  const handleSave = async () => {
    if (!sigCanvas.current) return;

    const signatureURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    const MyDocument = (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text>Código del contrato: {codigo}</Text>
            <Text>Nombre del Empleado: {empleado.nombre}</Text>
            <Text>CURP: {empleado.curp}</Text>
            <Text>RFC: {empleado.rfc}</Text>
            <Text>NSS: {empleado.nss}</Text>
          </View>
          <View style={styles.section}>
            <Text>Términos y Condiciones</Text>
            <Text>1. El empleado se compromete a cumplir con todas las políticas y procedimientos de la empresa.</Text>
            <Text>2. La empresa se reserva el derecho de modificar los términos y condiciones del contrato con previo aviso al empleado.</Text>
            <Text>3. El empleado acepta que toda la información proporcionada es verídica y está actualizada.</Text>
          </View>
          <View style={styles.section}>
            <Text>Autorización para el Uso de Datos</Text>
            <Text>
              El empleado autoriza a la empresa a utilizar sus datos personales con el fin de cumplir con las obligaciones laborales y para cualquier otro propósito relacionado con la administración del personal.
              Esto incluye, pero no se limita a, el procesamiento de nómina, beneficios, y evaluaciones de desempeño.
            </Text>
          </View>
          <View style={styles.section}>
            <Text>Opinión de la Empresa sobre el Empleado</Text>
            <Text>
              La empresa considera que {empleado.nombre} es un activo valioso para el equipo. Su dedicación y profesionalismo han sido evidentes en todas sus tareas y responsabilidades.
              Confiamos en que su contribución seguirá siendo esencial para el éxito de nuestra organización.
            </Text>
          </View>
          <View style={styles.section}>
            <Text>Firma</Text>
            <Text>Al firmar este documento, el empleado acepta todos los términos y condiciones establecidos en este contrato.</Text>
            <View style={styles.signature}>
              <Text>Firma del Empleado:</Text>
              <img src={signatureURL} alt="Signature" style={{ width: '100%', height: 'auto' }} />
              <Text>{empleado.nombre}</Text>
            </View>
            <View style={styles.signature}>
              <Text>Firma del Representante de la Empresa:</Text>
              <Text>_____________________________</Text>
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(MyDocument).toBlob();
    saveAs(blob, 'Contrato_Firmado.pdf');
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSave}>Save as PDF</button>
    </div>
  );
};

export default SignaturePad;
