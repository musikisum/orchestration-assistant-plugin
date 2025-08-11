const styles = {
  // Modal Container
  modalContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    width: '100%',
    minHeight: '400px',
    maxWidth: '100%', 
    overflowX: 'auto'
  },

  // Box Header
  boxHeader: {
    gridColumn: '1 / 5',
    gridRow: '1 / 2',
    display: 'flex',
    height: '48px',
    alignItems: 'center',
  },

  // Box All
  boxAll: {
    gridColumn: '1 / 5',
    gridRow: '2 / 3',
    display: 'flex',
    height: '48px',
    alignItems: 'center',
    borderBottom: '1px solid gray',
  },

  // Section Container
  sectionContainer: {
    paddingTop: '24px',
    gridColumn: '1 / 5',
    gridRow: '3 / 4',
    display: 'flex',
    gap: '24px',
    flexDirection: 'row',
  },

  // Section
  section: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 25%',
  }
};

export default styles;

