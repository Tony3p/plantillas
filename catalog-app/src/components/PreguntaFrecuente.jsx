import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PreguntaFrecuente({ pregunta, respuesta }) {
    return (
        <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-panel-1-content"
              id="faq-panel-1-header"
            >
              <Typography variant="subtitle2">
                {pregunta}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {respuesta}
              </Typography>
            </AccordionDetails>
          </Accordion>
    );
}