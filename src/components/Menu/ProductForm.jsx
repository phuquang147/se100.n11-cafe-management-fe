import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack, Typography } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
import RHFAutocomplete from '../hook-form/RHFAutocomplete';
import Iconify from '~/components/UI/Iconify';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectCategories } from '~/redux/dataSlice';
import { toast } from 'react-toastify';
// import { createProduct, postImage } from '~/services/productService';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function ProductForm({ data = {} }) {
  const { name, price } = data;
  const [filename, setFilename] = useState('');
  const [uploadedFile, setUploadedFile] = useState();
  const inputFileRef = useRef();
  const categories = useSelector(selectCategories);
  const categoryNames = categories.map((category) => category.name);
  const dispatch = useDispatch();

  const editMode = Object.keys(data).length > 0;

  useEffect(() => {
    if (editMode) {
      setUploadedFile(`http://localhost:3001/${data.image}`);
    }
  }, [editMode, data.image]);

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên món'),
    price: Yup.number()
      .required('Vui lòng nhập giá')
      .typeError('Vui lòng nhập giá')
      .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  });

  const defaultValues = {
    name,
    price,
    category: (data.category && data.category.name) || 'Cà phê',
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { name, price, category } = values;
    const selectedCategory = categories.find((item) => item.name === category);

    if (inputFileRef.current.files.length === 0 && !editMode) {
      return toast.error('Vui lòng chọn hình ảnh');
    }

    if (!editMode) {
      try {
        const formData = new FormData();
        formData.append('image', inputFileRef.current.files[0]);
        // if (editMode) {
        //   formData.append('oldPath', data.image);
        // }

        const postImgRes = await fetch('http://localhost:3001/post-image', {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        const imgResData = await postImgRes.json();
        const imageUrl = imgResData.filePath;

        const product = {
          name: name,
          price: price,
          image: imageUrl,
          category: selectedCategory._id,
        };
        const addProductRes = await fetch('http://localhost:3001/products', {
          method: 'POST',
          body: JSON.stringify(product),
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
        });
        const productResData = await addProductRes.json();
        const { message, product: addedProduct } = productResData;
        console.log(productResData);

        toast.success(message);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      if (!inputFileRef.current.files[0]) {
        const updateProductRes = await fetch(`http://localhost:3001/products/${data._id}`, {
          method: 'PUT',
          body: JSON.stringify({ name: name, price: price, category: selectedCategory._id }),
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
        });
        const productResData = await updateProductRes.json();
        toast.success(productResData.message);
      } else {
        const formData = new FormData();
        formData.append('image', inputFileRef.current.files[0]);
        formData.append('oldPath', data.image);

        const postImgRes = await fetch('http://localhost:3001/post-image', {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        const imgResData = await postImgRes.json();
        const imageUrl = imgResData.filePath;

        const product = {
          id: data._id,
          name: name,
          price: price,
          image: imageUrl,
          category: selectedCategory._id,
        };
        const updateProductRes = await fetch(`http://localhost:3001/products/${data._id}`, {
          method: 'PUT',
          body: JSON.stringify(product),
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
        });
        const productResData = await updateProductRes.json();
        toast.success(productResData.message);
      }
    }
  };

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const uploadedFilename = e.target.files[0].name;
    setFilename(uploadedFilename);
    const reader = new FileReader();
    reader.onload = function () {
      setUploadedFile(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Tên món" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="price" label="Giá" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="category"
            label="Phân loại"
            options={categoryNames}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ mt: 2 }}
        alignItems={{ xs: 'unset', md: 'center' }}
        columnGap={2}
      >
        <Typography variant="body1">Hình ảnh</Typography>
        <Button variant="outlined" component="label" sx={{ py: 2, mt: { xs: 1, md: 0 } }}>
          <Iconify icon="heroicons:photo" width={30} height={30} />
          <input type="file" accept="image/*" ref={inputFileRef} hidden onChange={handleFileUpload} />
          {filename && (
            <Typography sx={{ ml: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {filename}
            </Typography>
          )}
        </Button>
      </Stack>

      {uploadedFile && (
        <Stack direction="row" justifyContent="start" sx={{ mt: 1 }}>
          <img src={uploadedFile} alt="Hình sản phẩm" style={{ maxWidth: '100%' }} crossOrigin="anonymous" />
        </Stack>
      )}

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {!editMode ? 'Tạo mới' : 'Cập nhật'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
