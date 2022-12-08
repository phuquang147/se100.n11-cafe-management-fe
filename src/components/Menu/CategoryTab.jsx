import { IconButton, MenuItem, Stack, Tab } from '@mui/material';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import MenuPopover from '~/HOC/MenuPopover';
import { deleteCategory } from '~/services/categoryServices';
import ConfirmModal from '../UI/ConfirmModal';
import Iconify from '../UI/Iconify';
import CategoryModal from './CategoryModal';

export default function CategoryTab({ label, value, category, handleChange }) {
  const anchorRef = useRef(null);

  const [openMenu, setOpenMenu] = useState(null);
  const [openModifyCategoryModal, setOpenModifyCategoryModal] = useState(false);
  const [openConfirmDeleteCategory, setOpenConfirmDeleteCategory] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleOpenModifyCategoryModal = () => {
    setOpenModifyCategoryModal(true);
  };

  const handleCloseModifyCategoryModal = () => {
    setOpenModifyCategoryModal(false);
  };

  const handleOpenConfirmDeleteCategory = () => {
    setOpenConfirmDeleteCategory(true);
  };

  const handleCloseConfirmDeleteCategory = () => {
    setOpenConfirmDeleteCategory(false);
  };
  const handleDeleteCategory = async () => {
    try {
      const categoryRes = await deleteCategory(category._id);
      if (categoryRes.status === 200) {
        toast.success(categoryRes.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      handleCloseConfirmDeleteCategory();
    }
  };

  return (
    <>
      <Tab
        label={
          <span>
            {label}
            <IconButton size="small" component="span" sx={{ ml: 2 }} ref={anchorRef} onClick={handleOpenMenu}>
              <Iconify icon="ph:dots-three-bold" width={24} height={24} />
            </IconButton>
          </span>
        }
        value={value}
        onClick={() => handleChange(value)}
      />
      <MenuPopover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Stack sx={{ p: 1 }}>
          <MenuItem onClick={handleOpenModifyCategoryModal}>Chỉnh sửa danh mục</MenuItem>
          <MenuItem onClick={handleOpenConfirmDeleteCategory}>Xóa danh mục</MenuItem>
        </Stack>
      </MenuPopover>

      <CategoryModal
        type="modify"
        isOpen={openModifyCategoryModal}
        category={category}
        onCloseModal={handleCloseModifyCategoryModal}
      />
      {openConfirmDeleteCategory && (
        <ConfirmModal
          content="Bạn chắc chắn muốn xóa danh mục?"
          open={openConfirmDeleteCategory}
          handleClose={handleCloseConfirmDeleteCategory}
          action={handleDeleteCategory}
        />
      )}
    </>
  );
}
