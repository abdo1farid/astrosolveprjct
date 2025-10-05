import pandas as pd
import matplotlib.pyplot as plt
from astropy.io import fits
import numpy as np

fits_path = "kplr005343973-2011271113734_INJECTED-inj3_llc.fits"
output_csv = "output.csv"

with fits.open(fits_path) as hdul:
    print(f"Opened {fits_path} with {len(hdul)} HDUs")

    table_hdu = None
    for hdu in hdul:
        if isinstance(hdu.data, np.recarray):
            table_hdu = hdu
            break

    if table_hdu is None:
        raise ValueError("No table found in this FITS file.")

    data_array = np.array(table_hdu.data)
    df = pd.DataFrame(data_array.byteswap().view(data_array.dtype.newbyteorder('=')))


df.columns = [str(c) for c in df.columns]
for col in df.columns:
    if df[col].dtype == object:
        df[col] = df[col].astype(str)

df.to_csv(output_csv, index=False)
print(f"FITS converted successfully → {output_csv}")
print("Columns:", list(df.columns))

possible_time = [c for c in df.columns if 'time' in c.lower() or 'jd' in c.lower()]
possible_flux = [c for c in df.columns if 'flux' in c.lower() or 'sap' in c.lower() or 'pdcsap' in c.lower()]

time_col = possible_time[0] if possible_time else df.columns[0]
flux_col = possible_flux[0] if possible_flux else df.columns[1]

print(f"Using time column: {time_col}")
print(f"Using flux column: {flux_col}")

plt.figure(figsize=(10,5))
plt.plot(df[time_col], df[flux_col], lw=0.5)
plt.xlabel(time_col)
plt.ylabel(flux_col)
plt.title("Light Curve from FITS File")
plt.grid(True)
plt.tight_layout()
plt.show()