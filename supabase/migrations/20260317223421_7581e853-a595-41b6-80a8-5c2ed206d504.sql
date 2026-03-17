INSERT INTO public.user_roles (user_id, role)
VALUES ('10801d2d-035e-4e4a-9b22-c57ae7f89063', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;